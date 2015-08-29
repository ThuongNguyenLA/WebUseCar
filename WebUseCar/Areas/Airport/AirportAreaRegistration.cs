using System.Web.Mvc;

namespace WebUseCar.Areas.Airport
{
    public class AirportAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Airport";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Airport_default",
                "Airport/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
