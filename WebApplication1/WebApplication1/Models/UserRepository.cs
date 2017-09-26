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

        public UserRepository()
        {
            this._context = new UserContext();
        }

        public User GetUser(string Mail, string Password)
        {
            return GetAllUsers().Where(user => user.Mail.Equals(Mail) && user.Password.Equals(Password)).FirstOrDefault();
        }

        public User GetUserByName(string Mail)
        {
            return GetAllUsers().Where(model => model.Mail.Equals(Mail)).FirstOrDefault();
        }

        public void UpdateUser(User User)
        {
            User _User = GetUserByName(User.UserName);

            _User.Password = User.Password;
            _context.Entry(_User).State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        private IEnumerable<User> GetAllUsers()
        {
            return this._context.Users;
        }
    }
}