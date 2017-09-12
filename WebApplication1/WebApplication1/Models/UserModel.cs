﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class UserModel
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }
        public float WalletTotal { get; set; }
    }

    public class UserDbContext : DbContext
    {
        public UserDbContext()
        {
            Database.SetInitializer<UserDbContext>(null);
        }
        public DbSet<UserModel> Users { get; set; }
    }
}