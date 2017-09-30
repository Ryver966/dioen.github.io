using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
using WebApplication1.Interface;
using WebApplication1.Models;


namespace WebApplication1.Service
{
    public class LoginService
    {
        public void Login(User User)
        {
                if (User != null)
                {
                User serializeModel = new User();
                serializeModel.ID = User.ID;
                serializeModel.UserName = User.UserName;
                serializeModel.UserRole = User.UserRole;

                var serializer = new JavaScriptSerializer();

                var userData = serializer.Serialize(serializeModel);

                    FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                             1,
                             User.Mail,
                             DateTime.Now,
                             DateTime.Now.AddMinutes(15),
                             false,
                             userData : userData);

                    string encTicket = FormsAuthentication.Encrypt(authTicket);
                    HttpCookie faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
                    HttpContext.Current.Response.Cookies.Add(faCookie);
                }
        }
    }
}