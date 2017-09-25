using Microsoft.Ajax.Utilities;
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
        private UserRepository _UserRepository;

        public DashboardController()
        {
            this.UserContext = new UserContext();
            this._UserRepository = new UserRepository(new UserContext());
        }
        // GET: Dashboard
        [Authorize(Roles = "User")]
        public ActionResult Index(User User)
        {
            User user = UserContext.Users.Where(model => model.Mail.Equals(User.Mail)).FirstOrDefault();
            return View(user);
        }

        // GET: Edit
        [Authorize(Roles = "User")]
        public ActionResult Edit()
        {
            return View();
        }

        [Authorize(Roles = "User")]
        [HttpPost]
        public ActionResult Edit(User User)
        {
            if (ModelState.IsValid)
            {
                _UserRepository.UpdateUser(User);
                System.Web.HttpContext.Current.Application.Remove(System.Web.HttpContext.Current.User.Identity.Name);
                return RedirectToAction("Index", "Login", null);
            }

            return View();
        }
    }
}