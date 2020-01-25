using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Identity.Models
{
    public class Marker
    {
        public int Id { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
        public string ImageUrl { get; set; }
        public string HoverText { get; set; }
        public int LayerLinkId { get; set; }

        // Foreign Key
        public int LayerId { get; set; }
    }
}