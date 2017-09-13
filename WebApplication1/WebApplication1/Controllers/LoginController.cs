using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(User User)
        {
            var UserDB = new UserDbContext();

                if (ModelState.IsValid)
                {
                    var cos = User;
                    var _User = UserDB.Users.Where(record => record.Mail.Equals(User.Mail) && record.Password.Equals(User.Password)).FirstOrDefault();
                    var asd = _User;
                    var cc = asd;
                    if (_User != null)
                    {
                        return View();
                    }
                }

            return View();
        }
    }
}