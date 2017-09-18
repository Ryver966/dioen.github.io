using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using WebApplication1.Models;
using WebApplication1.Principal;

namespace WebApplication1
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //Database.SetInitializer<UserContext>(new DropCreateDatabaseIfModelChanges<UserContext>());
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpCookie authCookie = Context.Request.Cookies[FormsAuthentication.FormsCookieName];

            if (authCookie == null || authCookie.Value == "")
                return;

            FormsAuthenticationTicket authTicket;

            try
            {
                authTicket = FormsAuthentication.Decrypt(authCookie.Value);
            }
            catch
            {
                return;
            }

            var userData = authTicket.UserData;

            var loggedUser = new GenericIdentity(authTicket.Name);

            var userDataViewModel = JsonConvert.DeserializeObject<User>(userData);

            //if (userDataViewModel.ProfilePhotoPath != null)
            //{
            //    loggedUser.AddClaim(new Claim("ProfilePhotoPath", userDataViewModel.ProfilePhotoPath));
            //}

            if (Context.User == null)
            {
                Context.User = new GenericPrincipal(loggedUser, userDataViewModel.UserRole.Split(new string[] { "," }, StringSplitOptions.None));
            }
        }
    }
}
