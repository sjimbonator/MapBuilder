using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace Identity.FileUpload
{
    public class FileUploadDetails
    {
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

    }
}