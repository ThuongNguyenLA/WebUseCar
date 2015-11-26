using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace WebUseCar.App_Start
{
    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/ionic-jquery").Include(
                    "~/lib/ionic/js/ionic.bundle.min.js",

                    "~/js/jquery-2.1.1.min.js"
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/maps").Include(
                    "~/lib/ngCordova/dist/ng-cordova.js",

                    "~/js/map/lodash.js",

                    "~/js/global.js",

                    "~/js/map/tommyGoogleMaps.js",

                    "~/scripts/angular-ios9-uiwebview.patch.js",

                    "~/js/drawer.js",

                    "~/js/app.js"
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/custom/controllers").Include(
                    //Profile
                    "~/Areas/Profile/JSController/LoginController.js",

                    "~/Areas/Profile/JSController/ProfileController.js",
                    //Ride
                    "~/Areas/Ride/JSController/RideController.js",

                    "~/Areas/Ride/JSController/EstimateFareController.js",

                    "~/Areas/Ride/JSController/RideEstimatefareController.js",

                    "~/Areas/Ride/JSController/FreeRideController.js",
                    //Airport
                    "~/Areas/Airport/JSController/AirportController.js",
                    //MyTrip
                    "~/Areas/MyTrip/JSController/MyTripController.js",
                    //Payment
                    "~/Areas/Payment/JSController/PaymentController.js",
                    //LocalEvent
                    "~/Areas/LocalEvent/JSController/LocalEventController.js",

                    "~/Areas/LocalEvent/JSController/DetailController.js",

                    "~/js/controllers.js",

                    "~/js/helper.js"
                )
            );
            bundles.Add(new ScriptBundle("~/bundles/appWelCome").Include(
                    "~/js/appWelcome.js",
                    "~/js/Helper.js"
                )
            );
        }
    }

}