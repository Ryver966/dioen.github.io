using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    public class DashboardController : Controller
    {
        private UserService _UserService;


        public DashboardController()
        {
            this._UserService = new UserService();
        }
        // GET: Dashboard
        [Authorize(Roles = "User")]
        public ActionResult Index(User User)
        {
            User user = _UserService.GetUser(User.Mail, User.Password);
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
            User.UserName = HttpContext.User.Identity.Name;

            if (ModelState.IsValid)
            {
                this._UserService.UpdateUser(User);
                System.Web.HttpContext.Current.Application.Remove(System.Web.HttpContext.Current.User.Identity.Name);
                return RedirectToAction("Index", "Login", null);
            }

            return View(User);
        }
    }
}