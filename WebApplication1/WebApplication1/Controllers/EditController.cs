using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class EditController : Controller
    {
        private UserRepository _UserRepository;

        public EditController()
        {
            this._UserRepository = new UserRepository(new UserContext());
        }

        
    }
}