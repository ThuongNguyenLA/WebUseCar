var EstimateFareCtrl = function ($rootScope, $scope, $location, $ionicHistory, googleDirections, $stateParams, CommonPopupCtrl) {
    $scope.EstimatePrice = 0;
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

    $scope.Calculate = function (destination) {
        //alert(CURRENT_LOCATION);
        var currentLocation = CURRENT_LOCATION;
        try {
            if ($scope.txtPickup == undefined || $scope.txtPickup == "") {
                currentLocation = CURRENT_LOCATION;
            }
            else {
                currentLocation = txtPickup;
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
                            $scope.EstimatePrice = ndistance.replace("km", "").trim()*50;
                            //alert($scope.distance + ' ---- ' + $scope.duration);
                        }
                    }
                }
            });
        } catch (e) {
            alert(e);
        }
    }
}
EstimateFareCtrl.$inject = ["$rootScope", "$scope", "$location", "$ionicHistory", "googleDirections", "$stateParams", "CommonPopupCtrl"];