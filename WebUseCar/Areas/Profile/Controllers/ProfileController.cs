using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace WebUseCar.Areas.Profile.Controllers
{
    public class ProfileController : Controller
    {
        //
        // GET: /Profile/Profile/

        public ActionResult Profile()
        {
            return View();
        }
        public ActionResult FileUpload(HttpPostedFileBase file, FormCollection form)
        {
            string pic = System.IO.Path.GetFileName(file.FileName);
            UploadImage(pic, form["token"].ToString());
            return View();
        }
        public async Task<ActionResult> UploadImage(string strFileName, string strToken)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://api-rider.xeduadon.com/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", strToken);

                using (var content = new MultipartFormDataContent())
                {
                    var arr = System.IO.File.ReadAllBytes(@strFileName);
                    var fileContent = new ByteArrayContent(arr);
                    fileContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                    {
                        FileName = "testt.jpg"
                    };

                    content.Add(fileContent);
                    var result = client.PostAsync("api/Profile/UploadImage", content).Result;
                }
            }

            return Content(string.Empty);
        }
    }
}
