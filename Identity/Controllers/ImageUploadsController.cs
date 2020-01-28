using Identity.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Identity.FileUpload;
using System.Drawing;

namespace Identity.Controllers
{
    public class ImageUploadsController : ApiController
    {

        // asynchronous function 
        [Mime]
        public async Task<FileUploadDetails> Post()
        {
            // file path
            var fileuploadPath = HttpContext.Current.Server.MapPath("~/UploadedFiles");

            // 
            var multiFormDataStreamProvider = new MultiFileUploadProvider(fileuploadPath);

            // Read the MIME multipart asynchronously
            await Request.Content.ReadAsMultipartAsync(multiFormDataStreamProvider);

            string uploadingFileName = multiFormDataStreamProvider
                .FileData.Select(x => x.LocalFileName).FirstOrDefault();

            string baseUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            string filename = Path.GetFileName(uploadingFileName);
            baseUrl += "/UploadedFiles/" + filename;

            Image img = Image.FromStream(File.OpenRead(fileuploadPath + "/" + filename), false, false);

            // Create response, assigning appropriate values to properties 
            return new FileUploadDetails
            {
                FilePath = baseUrl,

                FileName = filename,

                Width = img.Width,

                Height = img.Height
            };
        }
    }
}

