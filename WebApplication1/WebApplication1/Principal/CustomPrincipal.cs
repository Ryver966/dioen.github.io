using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using WebApplication1.Interface;

namespace WebApplication1.Principal
{
    public class CustomPrincipal : GenericPrincipal
    {
        public CustomPrincipal(IIdentity identity, string[] roles, string UserName) : base(identity, roles)
        {
            this.UserName = UserName;
        }

        public string UserName { get; set; }
    }
}