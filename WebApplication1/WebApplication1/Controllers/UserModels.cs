namespace WebApplication1.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class UserModels
    {
        public int ID { get; set; }

        [StringLength(8000)]
        public string UserName { get; set; }

        [StringLength(8000)]
        public string Mail { get; set; }

        [StringLength(8000)]
        public string Password { get; set; }

        public float WalletTotal { get; set; }
    }
}
