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

        public override void Init()
        {
            base.AuthenticateRequest += OnAfterAuthenticateRequest;
        }

        private void OnAfterAuthenticateRequest(object sender, EventArgs eventArgs)
        {
            if (HttpContext.Current.User != null)
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    var cookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
                    var decodedTicket = FormsAuthentication.Decrypt(cookie.Value);
                    var roles = decodedTicket.UserData.Split(new[] { "|" }, StringSplitOptions.RemoveEmptyEntries);

                    var principal = new GenericPrincipal(HttpContext.Current.User.Identity, roles);
                    HttpContext.Current.User = principal;
                }
            }
        }
    }
}
