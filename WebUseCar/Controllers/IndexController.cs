using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using WebUseCar.App_Code;

namespace WebUseCar.Controllers
{
    public class IndexController : Controller
    {
        //
        // GET: /Index/
        
        public  ActionResult Index()
        {

            //using (var client = new HttpClient())
            //{
            //    client.BaseAddress = new Uri("http://api-rider.xeduadon.com/api/Profile/GetRider");
            //    client.DefaultRequestHeaders.Accept.Clear();
            //    client.DefaultRequestHeaders.Add("Authorization", "Bearer KlNHNDdOfGb-AsNTsbhdTjWCzBwfid-NLk0Ah1PHam5qKfGM_ZhU5a7XT_xNJfJVliwNLUyFmFtzEvksgkC6jpxajW4K4en01QWixKOv4E5B9eV973TorGKy4mETES9s7bWk9ltO4FlnXqEreaKKqCupQ3T6RNGU3i72rnyhrGsQr9vTKn7tPfYH0PTUcXz-h4wMu_pmgQil1BZCAXdcrQTICd16YNhwZlmHgr-73s91wzos9DT5nluGuvvxyT05tHPa-4fIQNdw8lRQacAPGQ");

            //    // New code:
            //    var response = client.GetStringAsync("http://api-rider.xeduadon.com/api/Localization/GetServiceMessages?languagecode=en-US").Result;
            //}
            return View();
        }

        public ActionResult HomeCreen()
        {
            return View();
        }
        public ActionResult Home()
        {
            return View();
        }
        public ActionResult WelCome()
        {
            return View();
        }
        public ActionResult SignUp()
        {
            return View();
        }
        public ActionResult SignUpDriver()
        {
            return View();
        }
        public ActionResult Login()
        {
           
            return View();
        }

        public JsonResult UserLogin(string strParam)
        { 
             using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(Helper.RIDER_API + "/api/token");
                //client.DefaultRequestHeaders.Accept.Clear();
                //client.DefaultRequestHeaders.Add("Authorization", "");

                // New code:
                var response = client.GetStringAsync(Helper.RIDER_API + "/api/token?" + strParam).Result;
                return Json(response);
            }
        }
        public ActionResult TemplateWelcome()
        {
            return View();
        }
        public ActionResult SignUpType()
        {
            return View();
        }

        
    }
}
