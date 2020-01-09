using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Identity.Models
{
    public class Map
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        // Foreign Key
        public int UserId { get; set; }
        // Navigation property
        // public User User { get; set; }
    }
}