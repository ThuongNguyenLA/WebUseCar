using System.Web.Mvc;

namespace WebUseCar.Areas.Ride
{
    public class RideAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Ride";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Ride_default",
                "Ride/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
