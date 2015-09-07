using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUseCar.Areas.Ride.Controllers
{
    public class RideController : Controller
    {
        //
        // GET: /Ride/Ride/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult EstimateFare()
        {
            return View();
        }
        public ActionResult RideEstimateFare()
        {
            return View();
        }
        public ActionResult Pickup()
        {

            return View();
        }
        public ActionResult RideFinalTrip()
        {

            return View();
        }
    }
}
