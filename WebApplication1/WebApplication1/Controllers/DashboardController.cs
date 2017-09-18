using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.Principal;

namespace WebApplication1.Controllers
{
    public class DashboardController : Controller
    {
        private UserContext UserContext;

        public DashboardController()
        {
            this.UserContext = new UserContext();
        }
        // GET: Dashboard
        [Authorize(Roles = "User")]
        public ActionResult Index(User User)
        {
            User user = UserContext.Users.Where(model => model.Mail.Equals(User.Mail)).FirstOrDefault();
            return View(user);
        }
    }
}