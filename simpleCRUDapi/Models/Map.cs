using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace simpleCRUDapi.Models
{
    public class Map
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}