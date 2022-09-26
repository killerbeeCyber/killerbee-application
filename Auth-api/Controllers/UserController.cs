using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace KillerBee
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public KillerBeeContext _KillerBeeContext;

        public UserController(KillerBeeContext killerbeecontext)
        {
            _KillerBeeContext = killerbeecontext;
        }

        // GET /user
        [Authorize]
        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            var users = _KillerBeeContext.Users.ToList();

            for (int ii = 0; ii < users.Count; ii++)
            {
                users[ii].PasswordHash = null;
                users[ii].PasswordSalt = null;
            }

            return users;
        }

        // GET /user/{id}
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<User> Get(int? id)
        {
            var user = _KillerBeeContext.Users.FirstOrDefault(s => s.UserId == id);

            if (user == null)
                return NotFound(new { message = "Could not find user" });

            user.PasswordHash = null;
            user.PasswordSalt = null;

            return user;
        }

        // POST /user
        [HttpPost]
        public ActionResult<User> Post([FromBody] RegisterModel registerModel)
        {
            if (registerModel.Username == null || registerModel.Password == null)
                return BadRequest(new { message = "Could not register because information are missing" });

            var user = new User();
            user.Username = registerModel.Username;
            user.Email = registerModel.Email;
            user.Phone = registerModel.Phone;
            user.Address = registerModel.Address;

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                user.PasswordSalt = hmac.Key;
                user.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerModel.Password));
            }

            _KillerBeeContext.Users.Add(user);

            if (_KillerBeeContext.Users.FirstOrDefault(s => s.Username == user.Username) != null)
                return BadRequest(new { message = "A user with this username already exists" });

            if (_KillerBeeContext.SaveChanges() < 1)
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Could not create user" });

            return Created(nameof(Get), new { message = "User created" });
        }


        // PUT /user/"{id}"
        [Authorize]
        [HttpPut("{id}")]
        public ActionResult<User> Put(int id, [FromBody] User value)
        {
            var user = _KillerBeeContext.Users.FirstOrDefault(s => s.UserId == id);

            if (user == null)
                return NotFound(new { message = "Could not find user" });

            // Permission check, not the cleanest
            var username = HttpContext.User.Claims.First(s => s.Type == "username").Value;
            if (!(
                    user.Username == username // If a user is trying to edit their own account
                    // || service commercial
                ))
                return Forbid();

            value.UserId = user.UserId;
            value.PasswordHash = user.PasswordHash;
            value.PasswordSalt = user.PasswordSalt;

            _KillerBeeContext.Entry<User>(user).CurrentValues.SetValues(value);
            if (_KillerBeeContext.SaveChanges() < 1)
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Could not edit user" });

            return user;
        }

        // DELETE /user/"{id}"
        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult<User> Delete(int id)
        {
            var user = _KillerBeeContext.Users.FirstOrDefault(s => s.UserId == id);

            if (user == null)
                return Ok(new { message = "User did not existed" });

            // Permission check, not the cleanest
            var username = HttpContext.User.Claims.First(s => s.Type == "username").Value;
            if (!(
                    user.Username == username // If a user is trying to edit their own account
                // || service commercial
                ))
                return Forbid();

            _KillerBeeContext.Users.Remove(user);
            if (_KillerBeeContext.SaveChanges() < 1)
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Could not delete user" });

            return Ok(new { message = "User deleted" });
        }
    }
}