using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity;

namespace WebApplication1.Models
{
    public class UserModel : DbContext
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }
        public double TotalWallet { get; set; }
    }

    public class UserDbContext : DbContext
    {
        public DbSet<UserModel> Users { get; set; }
    }
}