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
        public long FileLength { get; set; }

    }
}