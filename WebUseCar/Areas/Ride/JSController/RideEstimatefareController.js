var RideEstimatefareCtrl = function ($rootScope, $scope, $location, googleDirections, $stateParams) {
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
        var draggPosition = {};
        var car_icon = {
            'url': '/img/car.png',
            'size': {
                width: 40,
                height: 40
            }
        };
        //  $rootScope.map.setClickable(true);
        $rootScope.map.getMyLocation(function (location) {

            var msg = ["Current your location:\n",
						"latitude:" + location.latLng.lat,
						"longitude:" + location.latLng.lng,
						"speed:" + location.speed,
						"time:" + location.time,
						"bearing:" + location.bearing].join("\n");
            var MYLOCATION = new plugin.google.maps.LatLng(location.latLng.lat, location.latLng.lng);
            $rootScope.map.moveCamera({
                'target': MYLOCATION,
                'tilt': 30,
                'zoom': 15
            }, function () {
                var pin_icon = {
                    'url': cordova.file.applicationDirectory + 'www/img/pin.png',
                    'size': {
                        width: 40,
                        height: 40
                    }
                };
                $rootScope.map.addMarker({
                    'position': MYLOCATION,
                    'draggable': true,
                    'icon': pin_icon
                }, function (marker) {
                    marker.addEventListener(plugin.google.maps.event.MARKER_DRAG_END, function (marker) {
                        marker.getPosition(function (latLng) {
                            draggPosition = latLng;
                            marker.setTitle(latLng.toUrlValue());
                            marker.showInfoWindow();
                        });
                    });
                });
                for (i = 0 ;i<30;i++)
                {

                    try {
                        //alert(location.latLng.lat + 0.00009 * i)
                        var L1 = new plugin.google.maps.LatLng(location.latLng.lat + 0.00002, location.latLng.lng + 0.00002 );
                        $rootScope.map.addMarker({
                            'position': L1,
                            'title': 'Test 1',
                            'icon': car_icon
                        });
                    } catch (e) {
                        alert(e);
                    }
                    
                
                }
               
            });
            
        }, function (msg) {
            alert("error: " + msg);
        });
    };
    var div = document.getElementById("map_canvas");
    if (div) {
        //var mapHeight = window.innerHeight - 110;
       // div.style.height = mapHeight + 'px';
        setTimeout(function () {
            if (window.plugin) {
                // Initialize the map view
                if ($rootScope.map === undefined) {
                    $rootScope.map = plugin.google.maps.Map.getMap(div, {
                        'backgroundColor': 'white',
                        'mapType': plugin.google.maps.MapTypeId.ROADMAP,
                        'controls': {
                            'compass': true,
                            'myLocationButton': true,
                            'indoorPicker': true,
                            'zoom': true
                        },
                        'gestures': {
                            'scroll': true,
                            'tilt': true,
                            'rotate': true,
                            'zoom': true
                        }
                    });

                    $rootScope.map.addEventListener(plugin.google.maps.event.MAP_READY, onNativeMapReady);
                }
            }
        }, 10);
    }



}
RideEstimatefareCtrl.$inject = ["$rootScope", "$scope", "$location", "googleDirections", "$stateParams"];