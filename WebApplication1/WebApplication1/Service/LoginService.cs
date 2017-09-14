using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using WebApplication1.Models;

namespace WebApplication1.Service
{
    public class LoginService
    {
        public LoginService()
        {

        }

        public void Login(User User)
        {
            if (Membership.ValidateUser(User.Mail, User.Password))
            {
                //var user = UserContext.Users.Where(u => u.Email == viewModel.Email).First();

                //CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
                //serializeModel.Id = user.Id;
                //serializeModel.FirstName = user.FirstName;
                //serializeModel.LastName = user.LastName;

                //JavaScriptSerializer serializer = new JavaScriptSerializer();

                //string userData = serializer.Serialize(serializeModel);

                //FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                //         1,
                //         viewModel.Email,
                //         DateTime.Now,
                //         DateTime.Now.AddMinutes(15),
                //         false,
                //         userData);

                //string encTicket = FormsAuthentication.Encrypt(authTicket);
                //HttpCookie faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
                //Response.Cookies.Add(faCookie);
            }
        }
    }
}