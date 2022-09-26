using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KillerBee
{
    [Route("[controller]")]
    [ApiController]
    public class ConnectionLogController : ControllerBase
    {
        public IConfiguration _configuration;
        public KillerBeeContext _KillerBeeContext;

        public ConnectionLogController(IConfiguration config, KillerBeeContext killerbeecontext)
        {
            _configuration = config;
            _KillerBeeContext = killerbeecontext;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<List<ConnexionLog>> Get()
        {
            return _KillerBeeContext.ConnexionLogs.ToList();
        }
    }
}