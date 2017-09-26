using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Service
{
    public class UserService
    {
        private UserRepository _UserRepository;
        
        public UserService()
        {
            this._UserRepository = new UserRepository();
        }

        public User GetUser(string Mail, string Password)
        {
            return this._UserRepository.GetUser(Mail, Password);
        }

        public void UpdateUser(User User)
        {
            this._UserRepository.UpdateUser(User);
        }
    }
}