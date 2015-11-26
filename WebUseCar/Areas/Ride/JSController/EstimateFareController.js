var EstimateFareCtrl = ["$rootScope", "$scope", "$location", "$timeout", "$ionicHistory", "googleDirections", "$stateParams", "CommonPopupCtrl", function ($rootScope, $scope, $location, $timeout, $ionicHistory, googleDirections, $stateParams, CommonPopupCtrl) {
    $scope.EstimatePrice = 0;
    $scope.txtPickup = $rootScope.Pickup;
    $scope.txtDropoff = $rootScope.Dropoff;
    $scope.EstimateFare = function () {
        $location.path("/app/estimatefare");
    }
    $scope.BookCar = function () {
        //alert("s");
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        if ($("#txtDropoff").val() == "" || $("#txtDropoff").val() == null) {
            CommonPopupCtrl.show("Please, input dropoff");
            return;
        }
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
                                                               $("#Price").html(respone.money.value);
                                                               $("#DriverName").html(respone.driver.firstName + " " + respone.driver.lastName);
                                                               $("#CarModel").html(respone.vehicle.carModelName);
                                                               if (respone.driver.imagePath) {
                                                                   $("#DriverAvatar").attr("src", respone.driver.imagePath);
                                                               }

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
        } catch (e) {
            // alert(e);
        }
    }

    $scope.Calculate = function (destination) {

        CalculateDistance(destination);
    }



    //$.ajax({
    //    type: "GET",
    //    url: settings.domain + "api/Trip/GetEstimate?pickupLat="
    //        + settings.currentLocation.lat()
    //        + "&pickupLng=" + settings.currentLocation.lng()
    //        + "&totalDistanceInMeters=" + totalDistanceInMeters
    //        + "&totalSeconds=" + totalSeconds,
    //    data: null,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    cache: false,
    //    success: function (res) {
    //        if (res.success) {

    //            if (settings.isEstimate) {
    //                rider.displayEstimatResult(res);
    //            }

    //            if (settings.isRequestRide) {
    //                $("#divItineraryPreview #divEstimateItineraryTime").html(res.minutesString);
    //            }
    //        } else {
    //            notify.error(res.message);
    //            _scrollTop();
    //        }
    //    },
    //    failure: function (errMsg) {
    //        notify.error(errMsg);
    //    },
    //    headers: {
    //        "Authorization": rider.getToken()
    //    }
    //});

}];