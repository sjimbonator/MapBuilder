using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Identity.Models
{
    public class Marker
    {
        public int Id { get; set; }
        public float X { get; set; }
        public float Y { get; set; }

        // Foreign Key
        public int LayerId { get; set; }
    }
}