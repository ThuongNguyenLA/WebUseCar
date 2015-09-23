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

    function GetPositionByAddress(strAddress,callback)
    {
        var geocoder = new google.maps.Geocoder();
      

        geocoder.geocode({ 'address': strAddress }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                CURRENT_LOCATION= new plugin.google.maps.LatLng(latitude, longitude);
                callback(CURRENT_LOCATION);
            }
        });
    }
    

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
        if ($rootScope.Pickup != "" && $rootScope.Pickup != undefined) {
            GetPositionByAddress($rootScope.Pickup, function (CURRENT_LOCATION) {
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
            });

        }
        else {
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
        }
        
        for (var i = 1; i < 5; i++) {
            $rootScope.map.addMarker({
                'position': new plugin.google.maps.LatLng(CURRENT_LOCATION.lat + (i / 100), CURRENT_LOCATION.lng + (i / 100)),
                'title': 'Test ' + i,
                'icon': $rootScope.car_icon
            });
        }
    };
    navigator.geolocation.getCurrentPosition(function (position) {
        if ($rootScope.Pickup != "" && $rootScope.Pickup != undefined)
        {
            debugger;
            GetPositionByAddress($rootScope.Pickup, function (CURRENT_LOCATION) {
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
                            else {
                                $rootScope.map.setDiv(div);
                            }
                        }
                    }, 10);
                }
            });

        }
        else
        {
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
                            'latLng':CURRENT_LOCATION,
                            'tilt': 30,
                            'zoom': 15,
                            'bearing': 50
                        };
                        MY_MAP_DEFAULT_OPTION['mapType'] = plugin.google.maps.MapTypeId.ROADMAP;
                        $rootScope.map = plugin.google.maps.Map.getMap(div, MY_MAP_DEFAULT_OPTION);
                        $rootScope.map.addEventListener(plugin.google.maps.event.MAP_READY, onNativeMapReady);
                    }
                    else {
                        $rootScope.map.setDiv(div);
                    }
                }
            }, 10);
        }
    }
    },
    function () {
        console.log("get current location failed");
    });
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