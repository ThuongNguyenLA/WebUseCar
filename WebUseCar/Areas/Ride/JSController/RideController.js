var RideCtrl = function ($rootScope, $scope, $location, $ionicHistory, $state, googleDirections, CommonPopupCtrl, $timeout) {
    $scope.EstimateFare = function ()
    {
         
        $rootScope.Pickup = $("#txtPickup").val();//$scope.txtPickup;
        $rootScope.Dropoff = $("#txtDropoff").val();// $scope.txtDropoff;
        //$state.go("app.estimatefare");
        if ($("#txtDropoff").val() == "" || $("#txtDropoff").val() == null) {
            CommonPopupCtrl.show("Please, input dropoff");
            return;
        }
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        $state.go("app.estimatefare");
    }
    $scope.RequestRide = function () {


        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        var currentLocation = CURRENT_LOCATION;
        if ($("#txtPickup").val() == "") {
            currentLocation = CURRENT_LOCATION;
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': CURRENT_LOCATION }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $rootScope.Pickup = results[1].formatted_address;
                    }
                }
            });
        }
        else {
            currentLocation = $("#txtPickup").val();
            $rootScope.Pickup = $("#txtPickup").val();
        }
        //$scope.txtPickup;
        $rootScope.Dropoff = $("#txtDropoff").val();// $scope.txtDropoff;
        if ($("#txtDropoff").val() == "" || $("#txtDropoff").val() == null) {
            CommonPopupCtrl.show("Please, input dropoff");
            return;
        }
        else {
            var args = {
                origin: currentLocation,//"1/2 Út Tịch, Phường 4, Tân Bình, Hồ Chí Minh, Việt Nam",
                destination: $("#txtDropoff").val(),
                travelMode: 'driving',
                unitSystem: 'metric'
            }
            googleDirections.getDirections(args).then(function (destination) {
                if (destination) {
                    if (destination.routes) {
                        if (destination.routes[0].legs) {
                            debugger;
                            var ndistance = destination.routes[0].legs[0].distance.value;
                            var nduration = destination.routes[0].legs[0].duration.value;
                            $rootScope.Duration = nduration;
                            $rootScope.Distance = ndistance;
                            var geocoder = new google.maps.Geocoder();
                            geocoder.geocode({ 'address': $rootScope.Pickup }, function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    var latitude = results[0].geometry.location.lat();
                                    var longitude = results[0].geometry.location.lng();
                                    try {
                                        //alert($scope.duration);
                                        var data = "?pickupLat="
                                                 + latitude
                                                 + "&pickupLng=" + longitude
                                                 + "&totalDistanceInMeters=" + ndistance
                                                 + "&totalSeconds=" + nduration;
                                        // alert(data);
                                        PostDataAjax("/api/Trip/GetEstimate" + data, "",
                                           function (respone) {
                                               $timeout(function () {
                                                   if (respone.message) {
                                                       CommonPopupCtrl.show(respone.message);
                                                   }
                                                   else {
                                                       $timeout(function () {
                                                           if (respone.driver.id) {
                                                               $rootScope.driver = respone;
                                                               $ionicHistory.nextViewOptions({
                                                                   disableBack: true
                                                               });
                                                               $ionicHistory.clearHistory();
                                                               $location.path("/app/rideestimatefare/1");
                                                           }
                                                       }, 10);
                                                   }

                                               }, 10);
                                           }, function (error) {
                                               CommonPopupCtrl.show(error.responseText);
                                           }, true, "GET");
                                    } catch (e) { }

                                }
                            });



                        }
                    }
                }
            });



        }
    }
   
}
RideCtrl.$inject = ["$rootScope", "$scope", "$location", "$ionicHistory", "$state", "googleDirections", "CommonPopupCtrl", "$timeout"];