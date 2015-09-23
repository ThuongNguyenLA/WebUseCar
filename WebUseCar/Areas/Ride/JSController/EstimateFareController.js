var EstimateFareCtrl = function ($rootScope, $scope, $location, $ionicHistory, googleDirections, $stateParams, CommonPopupCtrl) {
    $scope.EstimatePrice = 0;
    $scope.txtPickup = $rootScope.Pickup;
    $scope.txtDropoff = $rootScope.Dropoff;
    $scope.EstimateFare = function ()
    {
        $location.path("/app/estimatefare");
    }
    $scope.BookCar = function () {
        //alert("s");
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        $location.path("/app/rideestimatefare/2");

    }
    function initiate_geolocation() {
        navigator.geolocation.getCurrentPosition(handle_geolocation_query);
    }
    function handle_geolocation_query(position) {
       // alert("oko");
        CURRENT_LOCATION = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //alert(CURRENT_LOCATION);

    }
    initiate_geolocation();
    CalculateDistance($scope.txtDropoff);
    function CalculateDistance(destination) {
        if (destination == null || destination == undefined)
            return;
        var currentLocation = CURRENT_LOCATION;
        try {
            if ($("#txtPickup").val() == "") {
                currentLocation = CURRENT_LOCATION;
            }
            else {
                currentLocation = $("#txtPickup").val();
            }
            var args = {
                origin: currentLocation,//"1/2 Út Tịch, Phường 4, Tân Bình, Hồ Chí Minh, Việt Nam",
                destination: destination,
                travelMode: 'driving',
                unitSystem: 'metric'
            }

            googleDirections.getDirections(args).then(function (destination) {
                if (destination) {
                    if (destination.routes) {
                        if (destination.routes[0].legs) {
                            var ndistance = destination.routes[0].legs[0].distance.text;
                            $scope.duration = destination.routes[0].legs[0].duration.text;
                            $scope.EstimatePrice = ndistance.replace("km", "").trim() * 50;
                            //alert($scope.distance + ' ---- ' + $scope.duration);
                        }
                    }
                }
            });
        } catch (e) {
           // alert(e);
        }
    }

    $scope.Calculate = function (destination) {

        CalculateDistance(destination);
    }
}
EstimateFareCtrl.$inject = ["$rootScope", "$scope", "$location", "$ionicHistory", "googleDirections", "$stateParams", "CommonPopupCtrl"];