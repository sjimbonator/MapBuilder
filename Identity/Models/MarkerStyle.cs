using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Identity.Models
{
    public class MarkerStyle
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        // Foreign Key
        public int MapId { get; set; }
    }
}