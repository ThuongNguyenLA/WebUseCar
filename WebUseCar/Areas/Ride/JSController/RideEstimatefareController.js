var RideEstimatefareCtrl = function ($rootScope, $scope, $location, googleDirections, $stateParams, CommonPopupCtrl) {
    $("#menuFreeRide a").css("color", "#48ccaa");
    $("#pn1").hide();
    $("#pn2").hide();
    if ($stateParams.id == "1") {
        $("#pn1").show();
    }
    else {
        $("#pn2").show();
    }
   // alert("controller freeride available");
    $scope.DisableMap = function () {
        $rootScope.map.setClickable(false);
    }
    $scope.EnableMap = function () {
        $rootScope.map.setClickable(true);
    }
    var onNativeMapReady = function () {
        if ($rootScope.pin_icon === undefined || $rootScope.car_icon === undefined) {
            $rootScope.pin_icon = global.getLocalIcon("pin.png");
            $rootScope.car_icon = global.getLocalIcon("car.png");
        }
        $rootScope.map.addMarker({
            'position': CURRENT_LOCATION,
            'icon': $rootScope.pin_icon
        }, function (marker) {
            marker.addEventListener(plugin.google.maps.event.MARKER_DRAG_END, function (marker) {
                marker.getPosition(function (latLng) {
                    draggPosition = latLng;
                    marker.setTitle(latLng.toUrlValue());
                    marker.showInfoWindow();
                });
            });
        });
        for (var i = 1; i < 5; i++) {
            $rootScope.map.addMarker({
                'position': new plugin.google.maps.LatLng(CURRENT_LOCATION.lat + (i / 100), CURRENT_LOCATION.lng + (i / 100)),
                'title': 'Test ' + i,
                'icon': $rootScope.car_icon
            });
        }
    };
    navigator.geolocation.getCurrentPosition(function (position) {
        CURRENT_LOCATION = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var div = document.getElementById("map_canvas");
        if (div) {
            var mapHeight = window.innerHeight - 210;
            div.style.height = mapHeight + 'px';
            setTimeout(function () {
                if (window.plugin) {
                    // Initialize the map view
                    if ($rootScope.map === undefined) {
                        MY_MAP_DEFAULT_OPTION['camera'] = {
                            'latLng': CURRENT_LOCATION,
                            'tilt': 30,
                            'zoom': 15,
                            'bearing': 50
                        };
                        MY_MAP_DEFAULT_OPTION['mapType'] = plugin.google.maps.MapTypeId.ROADMAP;
                        $rootScope.map = plugin.google.maps.Map.getMap(div, MY_MAP_DEFAULT_OPTION);
                        $rootScope.map.addEventListener(plugin.google.maps.event.MAP_READY, onNativeMapReady);
                    }
                }
            }, 10);
        }
    });





    ////////////////////////


    var points = [];// this array contains all change point
    var movePath = undefined; // this is the path of moves
    var geolocationSuccess = function (position) {
        // fire when location was changed when move
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var point = new plugin.google.maps.LatLng(lat, lng);
        points.push(point);
        if ($rootScope.map) {
            if (!movePath) { // if the map does not cotains move path before
                $rootScope.map.addPolyline({
                    points: points,
                    'color': 'red',
                    'width': 5,
                    'geodesic': true
                }, function (polyline) {
                    movePath = polyline;
                    $rootScope.map.setCenter(point);// center map to current point
                });
            }
            else {
                movePath.setPoints(points);
                $rootScope.map.setCenter(point);// center map to current point
            }
        }
    }
    //###################################################
    var watchId = null;
    // when user click on start button
    $scope.onStartButtonClick = function () {
        try{


       $rootScope.watchId = navigator.geolocation.watchPosition(
            geolocationSuccess,
            function (e) {
                // fire when get location change error
                // do something here
                alert(JSON.stringify(e));

            },
            { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
        );

        } catch (e) { alert("loi 1"+e.toString()); }
    };


    //###################################################
    // when user cick on stop button
    $scope.onStopButtonClick = function () {
        try {

            alert($rootScope.watchId);
        // 1. stop the watcher
            navigator.geolocation.clearWatch($rootScope.watchID);
        // 2. calculate LatLngBounds and set center the move path on the map
        var latLngBounds = new plugin.google.maps.LatLngBounds(points);
        $rootScope.map.animateCamera({
            'target': latLngBounds
        });
        // 3. export image
        $rootScope.map.toDataURL(function (imageData) {
            // base64 data here....
            alert(imageData);
        });
        // 4. calculate distance
        var args = {
            origin: points[0],
            destination: points[points.length - 1],
            waypoints: points,
            travelMode: 'driving',
            unitSystem: 'metric'
        }
        googleDirections.getDirections(args).then(function (directions) {
            alert(directions.routes[0].legs[0].distance.text);
        });
        // 5. reset points array
        points = [];
        // 6. remove move path on the map
        movePath.remove();
        movePath = undefined;
        } catch (e) { alert("loi end:"+e.toString());}
    };




    //////////////////
    var markerDriverCar = null;
    var DriverData = null;
    var objDriver=null;
    function DrawMap(lat, lng,DriverName)
    {
        try {
            //var latlng = new google.maps.LatLng(res.requestResult.driverCurrentPosition.lat, res.requestResult.driverCurrentPosition.lng);
            $rootScope.map.setCenter(new plugin.google.maps.LatLng(lat, lng));
            if (DriverData == null)
            {
                DriverData = {
                    'position': new plugin.google.maps.LatLng(lat, lng ),
                    'title': DriverName,
                    'icon': $rootScope.pin_car_move_icon
                }
            }
        }
        catch(ex){}
    }


    var bIsStartGo = false;
    function GetRequestResult() {
        var data = "?rideBookingId="
         + $scope.BookRideResult.rideBookingId
         + "&currentLat=" + $scope.PickupLat
         + "&currentLng=" + $scope.PickupLng;
        // alert(data);
        PostDataAjax("/api/Trip/GetRequestResult" + data, "",
           function (respone) {
               $timeout(function () {
                   if (respone.success) {
                       var DriverName = "Taxi";
                       try {
                           if (respone.requestResult && respone.requestResult.driver) {
                               var destination = new plugin.google.maps.LatLng(respone.requestResult.driver.lat, respone.requestResult.driver.lng);
                               var args = {
                                   origin: new plugin.google.maps.LatLng($scope.PickupLat, $scope.PickupLng),//"1/2 Út Tịch, Phường 4, Tân Bình, Hồ Chí Minh, Việt Nam",
                                   destination: destination,
                                   travelMode: 'driving',
                                   unitSystem: 'metric'
                               }
                               googleDirections.getDirections(args).then(function (destination) {
                                   if (destination) {
                                       if (destination.routes) {
                                           if (destination.routes[0].legs) {
                                               var nduration = destination.routes[0].legs[0].duration.value;
                                               ResetDriver(nduration, respone.requestResult.driver.firstName, respone.requestResult.driver.lastName, respone.requestResult.carModelName, respone.requestResult.driver.imagePath);
                                               DriverName = respone.requestResult.driver.firstName + " " + respone.requestResult.driver.lastName;
                                               $("#pn1").hide();
                                               $("#pn2").show();
                                               $("#btnBookDriver").hide();
                                           }
                                       }
                                   }
                               });
                           }
                       } catch (e) { alert(e) }
                       if (respone.rejected) {
                           //rider.backToCurrentLocationHandler();
                           //if (!$rootScope.POPUPISSHOW)
                           $("#loading2").hide();
                           CommonPopupCtrl.show(respone.message);
                       }
                       else if (respone.isStartGo) {
                           debugger;
                          // if (!$rootScope.POPUPISSHOW)
                           CommonPopupCtrl.show("Let go!");
                           bIsStartGo = true;
                           $scope.onStartButtonClick();
                           //$("#btnCancel").hide();
                           setTimeout(GetRequestResult(), 1000);

                       } else if (respone.isEndGo) {
                           bIsStartGo = false;
                           CommonPopupCtrl.show("Trip finished");
                           $scope.onStopButtonClick();
                       }
                       else {
                           //if (!$rootScope.POPUPISSHOW)
                           //hien thi tai xe dang den
                           debugger;
                           if ($("#loading2").is(":visible")) {
                            //   CommonPopupCtrl.show("Please, Driver is going to you");
                               $("#loading2").hide();
                           }
                         
                           if (!bIsStartGo)
                           DrawMap(respone.requestResult.driverCurrentPosition.lat, respone.requestResult.driverCurrentPosition.lng, DriverName);
                               setTimeout(GetRequestResult(), 1000);
                       }
                   } else {
                       //if (!$rootScope.POPUPISSHOW)
                       //CommonPopupCtrl.show(respone.message);
                       //hien thi thong bao dang tim tai xe

                       setTimeout(GetRequestResult(), 1000);
                   }
               }, 10);
           }, function (error) {
               CommonPopupCtrl.show(error.responseText);
           }, true, "GET",false);


    }
    
    function MainExecute()
    {

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': $rootScope.Pickup }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                $scope.PickupLat = latitude;
                $scope.PickupLng = longitude;
                //var curLocation = new  plugin.google.maps.LatLng(latitude, longitude);
                geocoder.geocode({ 'address': $rootScope.Dropoff }, function (results2, status2) {
                    var latitudeDropoff = results2[0].geometry.location.lat();
                    var longitudeDropoff = results2[0].geometry.location.lng();
                    if (status2 == google.maps.GeocoderStatus.OK) {
                        var data = {
                            pickupLat: latitude,
                            pickupLng: longitude,
                            dropoffLat: latitudeDropoff,
                            dropoffLng: longitudeDropoff,
                            dropoffAddress: $rootScope.Dropoff,
                            totalDistanceInMeters: $rootScope.Distance,
                            totalSeconds: $rootScope.Duration
                        };

                        PostDataAjax("/api/Trip/BookRide", data,
                        function (respone) {
                            $timeout(function () {
                                if (respone.success) {
                                    $scope.BookRideResult = respone;
                                    $("#loading2").show();
                                    GetRequestResult();
                                } else {
                                    if (!$rootScope.POPUPISSHOW)
                                        CommonPopupCtrl.show(respone.message);
                                }

                            }, 10);
                        }, function (error) {
                            CommonPopupCtrl.show(error.responseText);
                        }, true, "POST");


                    }
                });

            }
        });

    }


    $scope.BookRider=function()
    {
    

        MainExecute();

















       

    }



    //////////////////
















    //function GetPositionByAddress(strAddress, callback)
    //{
    //    var geocoder = new google.maps.Geocoder();
    //    geocoder.geocode({ 'address': strAddress }, function (results, status) {
    //        if (status == google.maps.GeocoderStatus.OK) {
    //            var latitude = results[0].geometry.location.lat();
    //            var longitude = results[0].geometry.location.lng();
    //            var curLocation = new plugin.google.maps.LatLng(latitude, longitude);
    //            callback(curLocation);
    //        }
    //    });
    //}
    

    //var onNativeMapReady = function () {
    //    if ($rootScope.pin_icon === undefined || $rootScope.car_icon === undefined) {
    //        $rootScope.pin_icon = global.getLocalIcon("pin.png");
    //        $rootScope.car_icon = global.getLocalIcon("car.png");
    //    }
    //    if ($rootScope.Pickup) {

    //        GetPositionByAddress($rootScope.Pickup, function (curLocation) {
    //            $rootScope.map.addMarker({
    //                'position': curLocation,
    //                'icon': $rootScope.pin_icon
    //            }, function (marker) {
    //                $rootScope.map.moveCamera({
    //                    'target': curLocation,
    //                    'tilt': 60,
    //                    'zoom': 18,
    //                    'bearing': 140
    //                }, function () {
    //                    console.log("The animation is done");
    //                });
    //            });
    //        });

    //    }
    //    else {
    //        $rootScope.map.addMarker({
    //            'position': CURRENT_LOCATION,
    //            'icon': $rootScope.pin_icon
    //        }, function (marker) {
    //            marker.addEventListener(plugin.google.maps.event.MARKER_DRAG_END, function (marker) {
    //                marker.getPosition(function (latLng) {
    //                    draggPosition = latLng;
    //                    marker.setTitle(latLng.toUrlValue());
    //                    marker.showInfoWindow();
    //                });
    //            });
    //        });
    //    }
        
    //    for (var i = 1; i < 5; i++) {
    //        $rootScope.map.addMarker({
    //            'position': new plugin.google.maps.LatLng(CURRENT_LOCATION.lat + (i / 100), CURRENT_LOCATION.lng + (i / 100)),
    //            'title': 'Test ' + i,
    //            'icon': $rootScope.car_icon
    //        });
    //    }
    //};
    //navigator.geolocation.getCurrentPosition(function (position) {
    //    if ($rootScope.Pickup)
    //    {
    //        debugger;
    //        GetPositionByAddress($rootScope.Pickup, function (curLocation) {
    //            var div = document.getElementById("map_canvas");
    //            if (div) {
    //                var mapHeight = window.innerHeight - 210;
    //                div.style.height = mapHeight + 'px';
    //                setTimeout(function () {
    //                    if (window.plugin) {
    //                        // Initialize the map view
    //                        if ($rootScope.map === undefined) {
    //                            MY_MAP_DEFAULT_OPTION['camera'] = {
    //                                'latLng': curLocation,
    //                                'tilt': 30,
    //                                'zoom': 15,
    //                                'bearing': 50
    //                            };
    //                            MY_MAP_DEFAULT_OPTION['mapType'] = plugin.google.maps.MapTypeId.ROADMAP;
    //                            $rootScope.map = plugin.google.maps.Map.getMap(div, MY_MAP_DEFAULT_OPTION);
    //                            $rootScope.map.addEventListener(plugin.google.maps.event.MAP_READY, onNativeMapReady);
    //                        }
    //                        else {
    //                            $rootScope.map.setDiv(div);
    //                        }
    //                    }
    //                }, 10);
    //            }
    //        });

    //    }
    //    else
    //    {
    //        CURRENT_LOCATION = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //        var div = document.getElementById("map_canvas");
    //    if (div) {
    //        var mapHeight = window.innerHeight - 210;
    //        div.style.height = mapHeight + 'px';
    //        setTimeout(function () {
    //            if (window.plugin) {
    //                // Initialize the map view
    //                if ($rootScope.map === undefined) {
    //                    MY_MAP_DEFAULT_OPTION['camera'] = {
    //                        'latLng':CURRENT_LOCATION,
    //                        'tilt': 30,
    //                        'zoom': 15,
    //                        'bearing': 50
    //                    };
    //                    MY_MAP_DEFAULT_OPTION['mapType'] = plugin.google.maps.MapTypeId.ROADMAP;
    //                    $rootScope.map = plugin.google.maps.Map.getMap(div, MY_MAP_DEFAULT_OPTION);
    //                    $rootScope.map.addEventListener(plugin.google.maps.event.MAP_READY, onNativeMapReady);
    //                }
    //                else {
    //                    $rootScope.map.setDiv(div);
    //                }
    //            }
    //        }, 10);
    //    }
    //}
    //},
    //function () {
    //    console.log("get current location failed");
    //});
    $scope.Calculate = function (destination) {
        return;
        var args = {
            origin: CURRENT_LOCATION,
            destination: destination,
            travelMode: 'driving',
            unitSystem: 'metric'
        }
        googleDirections.getDirections(args).then(function (directions) {
            $scope.distance = directions.routes[0].legs[0].distance.text;
            $scope.duration = directions.routes[0].legs[0].duration.text;
            alert($scope.distance + ' ---- ' + $scope.duration);
            //var arr = [];
            //_.map(google.maps.geometry.encoding.decodePath(directions.routes[0].overview_polyline), function (pos) {
            //    arr.push({ lat: pos.lat(), lng: pos.lng() });
            //    if ($rootScope.map) {
            //        $rootScope.map.addPolyline({
            //            'points': arr,
            //            'color': "red",
            //            'width': 5,
            //            'geodesic': true
            //        }, function (polyline) { });
            //    }
            //});
            //console.log(arr);
        });
    }
    $scope.ExportImage = function () {
        $("#pn1").hide();
        $("#pn2").show();

        return;
        if ($rootScope.map !== undefined) {
            $rootScope.map.toDataURL(function (imageData) {
                var image = document.getElementById("snapshot");
                image.src = imageData;
            });
        }
    }
    //var onNativeMapReady = function () {
    //    var draggPosition = {};
    //    var car_icon = {
    //        'url': '/img/car.png',
    //        'size': {
    //            width: 40,
    //            height: 40
    //        }
    //    };
    //    //  $rootScope.map.setClickable(true);
    //    $rootScope.map.getMyLocation(function (location) {

    //        var msg = ["Current your location:\n",
	//					"latitude:" + location.latLng.lat,
	//					"longitude:" + location.latLng.lng,
	//					"speed:" + location.speed,
	//					"time:" + location.time,
	//					"bearing:" + location.bearing].join("\n");
    //        var MYLOCATION = new plugin.google.maps.LatLng(location.latLng.lat, location.latLng.lng);
    //        $rootScope.map.moveCamera({
    //            'target': MYLOCATION,
    //            'tilt': 30,
    //            'zoom': 15
    //        }, function () {
    //            var pin_icon = {
    //                'url': cordova.file.applicationDirectory + 'www/img/pin.png',
    //                'size': {
    //                    width: 40,
    //                    height: 40
    //                }
    //            };
    //            $rootScope.map.addMarker({
    //                'position': MYLOCATION,
    //                'draggable': true,
    //                'icon': pin_icon
    //            }, function (marker) {
    //                marker.addEventListener(plugin.google.maps.event.MARKER_DRAG_END, function (marker) {
    //                    marker.getPosition(function (latLng) {
    //                        draggPosition = latLng;
    //                        marker.setTitle(latLng.toUrlValue());
    //                        marker.showInfoWindow();
    //                    });
    //                });
    //            });
    //            for (i = 0 ;i<30;i++)
    //            {

    //                try {
    //                    //alert(location.latLng.lat + 0.00009 * i)
    //                    var L1 = new plugin.google.maps.LatLng(location.latLng.lat + 0.00002, location.latLng.lng + 0.00002 );
    //                    $rootScope.map.addMarker({
    //                        'position': L1,
    //                        'title': 'Test 1',
    //                        'icon': car_icon
    //                    });
    //                } catch (e) {
    //                    alert(e);
    //                }
                    
                
    //            }
               
    //        });
            
    //    }, function (msg) {
    //        alert("error: " + msg);
    //    });
    //};
    //var div = document.getElementById("map_canvas");
    //if (div) {
    //    //var mapHeight = window.innerHeight - 110;
    //   // div.style.height = mapHeight + 'px';
    //    setTimeout(function () {
    //        if (window.plugin) {
    //            // Initialize the map view
    //            if ($rootScope.map === undefined) {
    //                $rootScope.map = plugin.google.maps.Map.getMap(div, {
    //                    'backgroundColor': 'white',
    //                    'mapType': plugin.google.maps.MapTypeId.ROADMAP,
    //                    'controls': {
    //                        'compass': true,
    //                        'myLocationButton': true,
    //                        'indoorPicker': true,
    //                        'zoom': true
    //                    },
    //                    'gestures': {
    //                        'scroll': true,
    //                        'tilt': true,
    //                        'rotate': true,
    //                        'zoom': true
    //                    }
    //                });

    //                $rootScope.map.addEventListener(plugin.google.maps.event.MAP_READY, onNativeMapReady);
    //            }
    //        }
    //    }, 10);
    //}



}
RideEstimatefareCtrl.$inject = ["$rootScope", "$scope", "$location", "googleDirections", "$stateParams", "CommonPopupCtrl"];