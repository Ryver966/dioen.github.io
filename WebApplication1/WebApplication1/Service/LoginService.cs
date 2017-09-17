using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
using WebApplication1.Interface;
using WebApplication1.Models;
using WebApplication1.Principal;


namespace WebApplication1.Service
{
    public class LoginService
    {
        private IUserRepository UserRepository;

        public LoginService()
        {
            this.UserRepository = new UserRepository(new UserContext());
        }

        public void Login(User User)
        {
                if (User != null)
                {
                //CustomPrincipal serializeModel = new CustomPrincipal(user.Mail);
                //serializeModel.ID = user.ID;
                //serializeModel.UserName = user.UserName;
                //serializeModel.UserRole = user.UserRole;

                //JavaScriptSerializer serializer = new JavaScriptSerializer();

                //string userData = serializer.Serialize(serializeModel);

                string roles = "Admin,User";

                    string userData = String.Join("|", roles);

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