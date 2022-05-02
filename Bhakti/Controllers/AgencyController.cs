using Bhakti.Models.Account;
using Bhakti.Models.Common;
using Microsoft.AspNetCore.Mvc;

namespace Bhakti.Controllers
{
    public class AgencyController : Controller
    {
        //[Authorize(Roles = "Admin")]
        public IActionResult GetRegisterAgencies(RegisterAgencies registerAgencies)
        {
            return View("RegisterAgencies", registerAgencies);
        }
        public IActionResult GetAgencyEvents(RegisterAgencies registerAgencies)
        {
            return View("AgencyEvents", registerAgencies);
        }
    }
}
