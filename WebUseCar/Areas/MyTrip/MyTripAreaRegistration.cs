using System.Web.Mvc;

namespace WebUseCar.Areas.MyTrip
{
    public class MyTripAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "MyTrip";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "MyTrip_default",
                "MyTrip/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
