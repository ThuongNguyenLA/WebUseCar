using System.Web.Mvc;

namespace WebUseCar.Areas.LocalEvent
{
    public class LocalEventAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "LocalEvent";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "LocalEvent_default",
                "LocalEvent/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
