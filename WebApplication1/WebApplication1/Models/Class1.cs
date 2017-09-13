using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class UserContext : DbContext
    {
        public UserContext() : base("UserContext")
        {

        }
        public DbSet<User> Users { get; set; }
    }
}