using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace KillerBee
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IConfiguration _configuration;
        public KillerBeeContext _KillerBeeContext;

        public AuthController(IConfiguration config, KillerBeeContext killerbeecontext)
        {
            _configuration = config;
            _KillerBeeContext = killerbeecontext;
        }

        // POST /login
        [HttpPost]
        [Route("login")]
        async public Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            if (loginModel.Username == null || loginModel.Password == null)
                return BadRequest(new { message = "Could not login because authentication information are missing" });

            var user = _KillerBeeContext.Users.FirstOrDefault(s => (s.Username == loginModel.Username));

            if (user == null || user.Username == null || user.PasswordHash == null || user.PasswordSalt == null)
                return Unauthorized(new { message = "Could not login" });

            using (var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginModel.Password));
                for (int ii = 0; ii < computedHash.Length; ii++)
                    if (computedHash[ii] != user.PasswordHash[ii])
                        return Unauthorized(new { message = "Could not login" });
            }

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"])),
                    SecurityAlgorithms.HmacSha256
                )
            );

            var stringifiedToken = new JwtSecurityTokenHandler().WriteToken(token);

            var dbModelToken = new Token();
            dbModelToken.TokenValue = stringifiedToken;
            dbModelToken.User = user;

            var dbModelConnexionLog = new ConnexionLog();
            dbModelConnexionLog.ConnexionDateTime = DateTime.Now;
            dbModelConnexionLog.User = user;

            _KillerBeeContext.Tokens.Add(dbModelToken);
            _KillerBeeContext.ConnexionLogs.Add(dbModelConnexionLog);
            _KillerBeeContext.SaveChanges();

            return Ok(new
            {
                message = "Login succeeded",
                token = stringifiedToken
            });
        }

        // DELETE /logout
        [Authorize]
        [HttpDelete]
        [Route("logout")]
        public ActionResult<Token> Logout()
        {
            var tokenValue = HttpContext.Request.Headers["Authorization"].ToString().Split(' ')[1];
            var token = _KillerBeeContext.Tokens.FirstOrDefault(s => s.TokenValue == tokenValue);

            if (token == null)
                return Ok(new { message = "User already logged out" });

            _KillerBeeContext.Tokens.Remove(token);
            if (_KillerBeeContext.SaveChanges() < 1)
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Could not logout user" });

            return Ok(new { message = "User logged out" });
        }

        [Authorize]
        [HttpGet]
        [Route("verifytoken")]
        public IActionResult VerifyToken()
        {
            return Ok(new
            {
                message = "Your token is valid"
            });
        }
    }
}