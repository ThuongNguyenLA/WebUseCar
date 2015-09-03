var MyTripCtrl = function ($rootScope, $scope, $location, googleDirections) {
   
    var map = new google.maps.Map(document.getElementById('map-canvas')); // Render our map within the empty div
    var image1 = new google.maps.MarkerImage("https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/car-.png", null, null, null, new google.maps.Size(40, 52)); // Create a variable for our marker image.
    //debugger;
    //$("#menuMyTrip a").css("color", "#48ccaa");
    //$("#contentMenu").hiden();
    //$("#contentMenu").css("z-index", "-999999");
    //alert("controller mytrip here");
    //$scope.Caculate = function () {
    //    var args = {
    //        origin: origin,
    //        destination: destination,
    //        travelMode: 'driving',
    //        unitSystem: 'metric'
    //    }
    //    googleDirections.getDirections(args).then(function (directions) {
    //        $scope.distance = directions.routes[0].legs[0].distance.text;
    //        $scope.duration = directions.routes[0].legs[0].duration.text;
    //        //console.log(directions);
    //        //var arr = [];
    //        //_.map(google.maps.geometry.encoding.decodePath(directions.routes[0].overview_polyline), function (pos) {
    //        //    arr.push({ lat: pos.lat(), lng: pos.lng() });
    //        //    if ($rootScope.map) {
    //        //        $rootScope.map.addPolyline({
    //        //            'points': arr,
    //        //            'color': "red",
    //        //            'width': 10,
    //        //            'geodesic': true
    //        //        }, function (polyline) {

    //        //        });
    //        //    }
    //        //});
    //        //console.log(arr);
    //    });
    //}
    //var onNativeMapReady = function () {
    //    var draggPosition = {};
    //    var car_icon = {
    //        'url': cordova.file.applicationDirectory + 'www/img/car.png',
    //        'size': {
    //            width: 40,
    //            height: 40
    //        }
    //    };
    //  //  $rootScope.map.setClickable(true);
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

    //            var L1 = new plugin.google.maps.LatLng(10.802352, 106.642338);
    //            $rootScope.map.addMarker({
    //                'position': L1,
    //                'title': 'Test 1',
    //                'icon': car_icon
    //            });
    //            var L2 = new plugin.google.maps.LatLng(10.832846, 106.666808);
    //            $rootScope.map.addMarker({
    //                'position': L2,
    //                'title': 'Test 2',
    //                'icon': car_icon
    //            });
    //            var L3 = new plugin.google.maps.LatLng(10.779078, 106.679229);
    //            $rootScope.map.addMarker({
    //                'position': L3,
    //                'title': 'Test 3',
    //                'icon': car_icon
    //            });
    //        });
    //        // $cordovaBackgroundGeolocation.configure({})
    //        //     .then(
    //        //       null, // Background never resolves
    //        //       function (err) { // error callback
    //        //         console.error("QQQQ cordovaBackgroundGeolocation Error " + err);
    //        //       },
    //        //       function (location) { // notify callback
    //        //         console.log(location);
    //        //       });

    //    }, function (msg) {
    //        alert("error: " + msg);
    //    });
    //};
    //var div = document.getElementById("map_canvas");
    //if (div) {
    //    //var mapHeight = window.innerHeight - 92;
    //    //div.style.height = mapHeight + 'px';
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
    
    $scope.OnBlur = function (result) {
        var lat = result.geometry.location.lat();
        var lng = result.geometry.location.lng();
        //var marker = new google.maps.Marker({ // Set the marker
        //    position: new google.maps.LatLng(lat, lng), // Position marker to coordinates
        //    icon: image1, //use our image as the marker
        //    map: map, // assign the marker to our map variable
        //    title: 'Click to visit our company on Google Places' // Marker ALT Text
        //});
        abc(lat, lng);
    };
    var abc = function (lat, lng) {
        
        var myLatlng = new google.maps.LatLng(lat, lng); // Add the coordinates
        var mapOptions = {
            zoom: 15, // The initial zoom level when your map loads (0-20)
            minZoom: 6, // Minimum zoom level allowed (0-20)
            maxZoom: 17, // Maximum soom level allowed (0-20)
            zoomControl: true, // Set to true if using zoomControlOptions below, or false to remove all zoom controls.
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT // Change to SMALL to force just the + and - buttons.
            },
            center: myLatlng, // Centre the Map to our coordinates variable
            mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map
            scrollwheel: false, // Disable Mouse Scroll zooming (Essential for responsive sites!)
            // All of the below are set to true by default, so simply remove if set to true:
            panControl: false, // Set to false to disable
            mapTypeControl: false, // Disable Map/Satellite switch
            scaleControl: false, // Set to false to hide scale
            streetViewControl: false, // Set to disable to hide street view
            overviewMapControl: false, // Set to false to remove overview control
            rotateControl: false // Set to false to disable rotate control
        }
        map.setOptions(mapOptions);

        var image = new google.maps.MarkerImage("https://www.creare.co.uk/wp-content/uploads/2013/08/marker.png", null, null, null, new google.maps.Size(40, 52)); // Create a variable for our marker image.

        var marker = new google.maps.Marker({ // Set the marker
            position: myLatlng, // Position marker to coordinates
            icon: image, //use our image as the marker
            map: map, // assign the marker to our map variable
            title: 'Click to visit our company on Google Places' // Marker ALT Text
        });
            
        var marker1 = new google.maps.Marker({ // Set the marker
            position: new google.maps.LatLng(lat + 0.005, lng + 0.003), // Position marker to coordinates
            icon: image1, //use our image as the marker
            map: map, // assign the marker to our map variable
            title: 'Click to visit our company on Google Places' // Marker ALT Text
        });


        var marker2 = new google.maps.Marker({ // Set the marker
            position: new google.maps.LatLng(lat + 0.008, lng + 0.001), // Position marker to coordinates
            icon: image1, //use our image as the marker
            map: map, // assign the marker to our map variable
            title: 'Click to visit our company on Google Places' // Marker ALT Text
        });

        var marker3 = new google.maps.Marker({ // Set the marker
            position: new google.maps.LatLng(lat + 0.003, lng), // Position marker to coordinates
            icon: image1, //use our image as the marker
            map: map, // assign the marker to our map variable
            title: 'Click to visit our company on Google Places' // Marker ALT Text
        });
        // 	google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker 
        //		window.location='http://www.snowdonrailway.co.uk/shop_and_cafe.php'; // URL to Link Marker to (i.e Google Places Listing)
        // 	});

        var infowindow = new google.maps.InfoWindow({ // Create a new InfoWindow
            content: "<h3>Snowdown Summit Cafe</h3><p>Railway Drive-through available.</p>" // HTML contents of the InfoWindow
        });
        google.maps.event.addListener(marker, 'click', function () { // Add a Click Listener to our marker
            infowindow.open(map, marker); // Open our InfoWindow
        });

        google.maps.event.addDomListener(window, 'resize', function () { map.setCenter(myLatlng); }); // Keeps the Pin Central when resizing the browser on responsive sites
    };
    function initialise() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lng = position.coords.longitude;
            var lat = position.coords.latitude;
            abc(lat, lng);
        });
        
    }
    initialise();
    //google.maps.event.addDomListener(window, 'load', initialise); // Execute our 'initialise' function once the page has loaded. 
}
MyTripCtrl.$inject = ["$rootScope", "$scope", "$location", "googleDirections"];