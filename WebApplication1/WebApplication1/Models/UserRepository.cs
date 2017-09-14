using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Interface;

namespace WebApplication1.Models
{
    public class UserRepository : IUserRepository, IDisposable
    {
        private UserContext _context;

        public UserRepository(UserContext context)
        {
            this._context = context;
        }

        public User GetUser(string Mail, string Password)
        {
            return GetAllUsers().Where(user => user.Mail.Equals(Mail) && user.Password.Equals(Password)).FirstOrDefault();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        private IEnumerable<User> GetAllUsers()
        {
            return _context.Users;
        }
    }
}