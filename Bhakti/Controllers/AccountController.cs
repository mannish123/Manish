using Bhakti.Helper;
using Bhakti.Models.Account;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace Bhakti.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string userName, string password)
        {
            if (!string.IsNullOrEmpty(userName) && string.IsNullOrEmpty(password))
            {
                return RedirectToAction("Login");
            }

            //Check the user name and password  
            //Here can be implemented checking logic from the database  
            ClaimsIdentity identity = null;
            bool isAuthenticated = false;

            //Querying with LINQ to Entities 
            using (var context = new Data.BhaktiContext())
            {
                var user = context.User.Where(s => s.UserName == userName && s.Password == password)
                    .Join(context.UserType, usr => usr.UserTypeId, usrt => usrt.Id, (usr, usrt) => new { usr, usrt }
                    ).SingleOrDefault();

               

                var userRole = context.UserRole
                    .Where(x => x.UserId == user.usr.Id)
                    .Join(context.Role, url => url.RoleId, rl => rl.Id, (url, rl) => new { url, rl }
                    ).Select(u => u.rl.Name).SingleOrDefault(); 

                //Create the identity for the user  
                identity = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Name, userName),
                    new Claim(ClaimTypes.Role, userRole)
                }, CookieAuthenticationDefaults.AuthenticationScheme);

                isAuthenticated = true;

                if (isAuthenticated)
                {
                    var principal = new ClaimsPrincipal(identity);

                    var login = HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
                    
                    Users users = new Users()
                    {
                        Id = user.usr.Id,
                        UserName = user.usr.UserName,
                        UserTypeId = user.usr.UserTypeId
                    };
                    SetSessionData(users, userRole);

                    if (user.usr.UserType.Id == 1)
                    {
                        return RedirectToAction("AgencyHome", "Home");
                    }
                    else
                    {
                        return RedirectToAction("GetEventsBooked", "Event", new { userId= user.usr.Id });
                    }
                }
            }

            return View();
            
        }
       
        [HttpGet]
        public IActionResult Logout()
        {
            var login = HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }


        #region Register User/Agency
        public IActionResult RegisterUser()
        {
            RegisterUsers registerUser = new RegisterUsers();

            return View("RegisterUser", registerUser);
        }
        public IActionResult RegisterAgency()
        {
            RegisterAgencies registerAgency = new RegisterAgencies();

            return View("RegisterAgency", registerAgency);
        }
        [HttpPost]
        public IActionResult RegisterUser(RegisterUsers registerUser)
        {

            Data.BhaktiContext bhaktiContext = new Data.BhaktiContext();
            var registerUsers = new Data.RegisterUser()
            {
                FirstName = registerUser.FirstName,
                LastName = registerUser.LastName,
                EmailId = registerUser.EmailId,
                PhoneNumber = registerUser.PhoneNumber,
                
            };

            bhaktiContext.RegisterUser.Add(registerUsers);
            bhaktiContext.SaveChanges();

            int registrationId = registerUsers.Id;

            bhaktiContext.User.Add(new Data.User() { RegistrationId = registrationId, UserName = registerUser.EmailId, Password = registerUser.Password, });

            bhaktiContext.SaveChanges();

            return RedirectToAction("UserHome", "Home");
        }
        [HttpPost]
        public IActionResult RegisterAgency(RegisterAgencies registerAgency)
        {
            Data.BhaktiContext bhaktiContext = new Data.BhaktiContext();
            var registerAgencies = new Data.RegisterAgency()
            {
                AgencyName = registerAgency.AgencyName,
                EmailId = registerAgency.EmailId,
                PhoneNumber = registerAgency.PhoneNumber,
            };

            bhaktiContext.RegisterAgency.Add(registerAgencies);
            bhaktiContext.SaveChanges();

            int registrationId = registerAgencies.Id;

            bhaktiContext.User.Add(new Data.User() { RegistrationId = registrationId, UserName = registerAgency.EmailId, Password = registerAgency.Password, });

            bhaktiContext.SaveChanges();

            return RedirectToAction("AgencyHome", "Home");
        }
        #endregion
        #region PrivateMethod

        public void SetSessionData(Users user, string userRoleName)
        {
            

            //UserRoles userRoles = new UserRoles()
            //{
            //    Id = user.Id,
            //    UserId = Convert.ToInt32(user.Id),
            //    RoleId = userRole.RoleId
            //};

            //HttpContext.Session.SetObjectAsJson("User", user);
            HttpContext.Session.SetInt32("UserId", user.Id);
            HttpContext.Session.SetString("UserRoleName", userRoleName);
            HttpContext.Session.SetString("UserName", user.UserName);


        }
        #endregion
    }
}
