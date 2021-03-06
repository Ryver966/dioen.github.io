namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApplication1.Models.UserContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApplication1.Models.UserContext context)
        {
            context.Users.AddOrUpdate(
              p => p.ID,
              new Models.User { ID = 1, Mail = "test1@test1.pl", Password = "test", UserName = "testUser", WalletTotal = 523.23F,  UserRole = "User" }
            );
        }
    }
}
