using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Interface;
using WebApplication1.Models;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    public class LoginController : Controller
    {
        private IUserRepository UserRepository;
        private LoginService LoginService;

        public LoginController()
        {
            this.UserRepository = new UserRepository(new UserContext());
            this.LoginService = new LoginService();
        }
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(User User)
        {
            var UserDB = new UserContext();

                if (ModelState.IsValid)
                {
                    var user = UserRepository.GetUser(User.Mail, User.Password);
                    LoginService.Login(user);

                    return RedirectToAction("Index", "Dashboard", user);
                }

            return View();
        }
    }
}