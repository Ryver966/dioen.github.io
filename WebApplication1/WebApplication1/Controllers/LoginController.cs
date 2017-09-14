using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class LoginController : Controller
    {
        private IUserRepository UserRepository;

        public LoginController()
        {
            this.UserRepository = new UserRepository(new UserContext());
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
                var cos = user;



                    //var cos = User;
                    //var _User = UserDB.Users.Where(record => record.Mail.Equals(User.Mail) && record.Password.Equals(User.Password)).FirstOrDefault();
                    //var asd = _User;
                    //var cc = asd;
                    //if (_User != null)
                    //{
                    //    return View();
                    //}
                }

            return View();
        }
    }
}