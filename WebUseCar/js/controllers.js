var usecar = angular.module('starter.controllers', ['tommy.GoogleMaps']);

usecar.controller("LoginCtrl", LoginCtrl);
usecar.controller("ProfileCtrl", ProfileCtrl);
usecar.controller("RideCtrl", RideCtrl);
usecar.controller("EstimateFareCtrl", EstimateFareCtrl);
usecar.controller("AirportCtrl", AirportCtrl);
usecar.controller("MyTripCtrl", MyTripCtrl);
usecar.controller("FreeRideCtrl", FreeRideCtrl);
usecar.controller("PaymentCtrl", PaymentCtrl);
usecar.controller("LocalEventCtrl", LocalEventCtrl);
usecar.controller("LocalEventDetailCtrl", LocalEventDetailCtrl);
usecar.controller("RideEstimatefareCtrl", RideEstimatefareCtrl);
usecar.factory('CommonPopupCtrl', function ($rootScope, $ionicPopup, $timeout) {
    helper = {};

    helper.show = function (strPopupContent) {
        // $scope.data = {}
        if ($rootScope.map) {
            $rootScope.map.setClickable(false);
        }
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: strPopupContent,
            title: 'Alert',
            subTitle: '',
            buttons: [
              { text: 'OK', type: 'btnUseCar' },
            ]
        });
        myPopup.then(function (res) {
            if ($rootScope.map) {
                $rootScope.map.setClickable(true);
            }
            console.log('Tapped!', res);
        });
    };
    //// A confirm dialog
    //$scope.showConfirm = function () {
    //    var confirmPopup = $ionicPopup.confirm({
    //        title: 'Consume Ice Cream',
    //        template: 'Are you sure you want to eat this ice cream?'
    //    });
    //    confirmPopup.then(function (res) {
    //        if (res) {
    //            console.log('You are sure');
    //        } else {
    //            console.log('You are not sure');
    //        }
    //    });
    //};
    //// An alert dialog
    //$scope.showAlert = function () {
    //    var alertPopup = $ionicPopup.alert({
    //        title: 'Don\'t eat that!',
    //        template: 'It might taste good'
    //    });
    //    alertPopup.then(function (res) {
    //        console.log('Thank you for not eating my delicious ice cream cone');
    //    });
    //};
    return helper;
});
usecar.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $location, $state, $ionicHistory, $rootScope, googleDirections) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        //$state.go("app.home");
        //$scope.modal.show();
        window.location.href = "/index#/app/home";
    };
    $scope.FooterMenuActive = function (ev, id) {
        //$rootScope.map.setClickable(false);
        $(".icon-footer").find("span").removeClass("active");
        $("#" + id).addClass("active");
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        switch (id) {
            case 1:
                $state.go("app.mytrip");
                $ionicHistory.clearHistory();
                break;
            case 2:
                $state.go("app.localevent");
                $ionicHistory.clearHistory();
                break;
            case 3:
                $state.go("app.ride");
                $ionicHistory.clearHistory();
                break;
            case 4:
                $state.go("app.airport");
                $ionicHistory.clearHistory();
                break;
        }
    }
    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
});
usecar.controller('HomeCtrl', function ($scope, $rootScope, $ionicPopup, $timeout, $ionicSlideBoxDelegate, CommonPopupCtrl, $ionicPlatform) {

    //$.ajax({
    //    type: "GET",
    //    url: settings.domain + "api/Trip/GetDriversAround?lat=" + settings.currentLocation.lat() + "&lng=" + settings.currentLocation.lng(),
    //    data: null,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    cache: false,
    //    success: function (res) {
    //        if (res.success) {

    //            markerCurrentLocation.setPosition(settings.currentLocation);

    //            $(markersDriver).each(function () {
    //                this.setMap(null);
    //            });

    //            markersDriver = [];

    //            $(res.drivers).each(function () {
    //                var driver = this.driver;
    //                var latlng = new google.maps.LatLng(driver.lat, driver.lng);
    //                var markerDriver = new google.maps.Marker({
    //                    map: mapCurrentLocation,
    //                    position: latlng,
    //                    draggable: true,
    //                    animation: google.maps.Animation.DROP,
    //                    title: driver.firstName + " " + driver.lastName,
    //                    icon: settings.carIcon
    //                });
    //                markersDriver.push(markerDriver);
    //            });

    //            var bounds = new google.maps.LatLngBounds();

    //            if (markersDriver.length > 0) {
    //                bounds.extend(settings.currentLocation);
    //                $(markersDriver).each(function () {
    //                    var markerDriver = this;
    //                    bounds.extend(markerDriver.getPosition());
    //                });
    //            }

    //            if (markersDriver.length > 0) {
    //                mapCurrentLocation.setCenter(bounds.getCenter());
    //                mapCurrentLocation.fitBounds(bounds);
    //            } else {
    //                mapCurrentLocation.setCenter(settings.currentLocation);
    //                mapCurrentLocation.setZoom(settings.zoom);
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
    $ionicPlatform.ready(function () {
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
            try {
                var data = "?lat=" + CURRENT_LOCATION.lat + "&lng=" + CURRENT_LOCATION.lng;
                PostDataAjax("/api/Trip/GetDriversAround" + data, "",
                function (respone) {
                    $timeout(function () {
                        if (respone.message) {
                            CommonPopupCtrl.show(respone.message);
                        }
                        else {
                            try {
                                $(respone.drivers).each(function () {
                                    var driver = this.driver;
                                    var latlng = new google.maps.LatLng(driver.lat, driver.lng);
                                    $rootScope.map.addMarker({
                                        'position': new plugin.google.maps.LatLng(driver.lat, driver.lng),
                                        'title': driver.firstName + " " + driver.lastName,
                                        'icon': $rootScope.car_icon
                                    });
                                });
                            } catch (e) { alert(e); }
                        }

                    }, 10);
                }, function (error) {
                    CommonPopupCtrl.show(error.responseText);
                }, true, "GET");
            } catch (e) { alert(e); }
            //for (var i = 1; i < 5; i++) {
            //    $rootScope.map.addMarker({
            //        'position': new plugin.google.maps.LatLng(CURRENT_LOCATION.lat + (i / 1000), CURRENT_LOCATION.lng + (i / 1000)),
            //        'title': 'Test ' + i,
            //        'icon': $rootScope.car_icon
            //    });
            //}
        };
        navigator.geolocation.getCurrentPosition(function (position) {
            CURRENT_LOCATION = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var div = document.getElementById("map_canvas_2");
            if (div) {
                var mapHeight = window.innerHeight - 100;
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
        },
        function () {
            console.log("get current location failed");
        });
    });
    
})
usecar.controller('TestSubCtrl', function ($scope, $ionicPopup, $timeout) {
    alert("sub");
});

usecar.controller('PlaylistsCtrl', function ($scope, $ionicPopup, $timeout) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];

    $scope.showPopup = function () {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="password" ng-model="data.wifi">',
            title: 'Enter Wi-Fi Password',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                  text: '<b>Save</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      if (!$scope.data.wifi) {
                          //don't allow the user to close unless he enters wifi password
                          e.preventDefault();
                      } else {
                          alert($scope.data.wifi);
                          return $scope.data.wifi;
                      }
                  }
              },
            ]
        });
        myPopup.then(function (res) {
            console.log('Tapped!', res);
        });
        //$timeout(function () {
        //    myPopup.close(); //close the popup after 3 seconds for some reason
        //}, 3000);
    };
    // A confirm dialog
    $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Consume Ice Cream',
            template: 'Are you sure you want to eat this ice cream?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
    };

    // An alert dialog
    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Don\'t eat that!',
            template: 'It might taste good'
        });
        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
});
usecar.controller('MapCtrl', function ($scope, $ionicLoading, $compile) {

    function initialize() {
        debugger;
        var myLatlng = new google.maps.LatLng(43.07493, -89.381388);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
        debugger;

        $scope.map = map;
    }
    //google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function () {
        if (!$scope.map) {
            return;
        }
        debugger;
        //$scope.loading = $ionicLoading.show({
        //    content: 'Getting current location...',
        //    showBackdrop: false
        //});
        try {
            navigator.geolocation.getCurrentPosition(function (pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            });
        } catch (e) {
            alert(e);
        }

    };

    $scope.clickTest = function () {
        alert('Example of infowindow with ng-click')
    };
    initialize();
});
usecar.controller('ListCtrl', function ($scope) {
    debugger;
    $scope.data = {
        showDelete: false
    };

    $scope.edit = function (item) {
        alert('Edit Item: ' + item.id);
    };
    $scope.share = function (item) {
        alert('Share Item: ' + item.id);
    };

    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.items = [
      { id: 0 },
      { id: 1 },
      { id: 2 }

    ];
});
usecar.controller("RefeshCtrl", function ($scope, $timeout) {
    //$scope.items = ['Item 1', 'Item 2', 'Item 3'];
    //$scope.doRefresh = function () {
    //    $timeout(function () {
    //        //simulate async response
    //        $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

    //        //Stop the ion-refresher from spinning
    //        $scope.$broadcast('scroll.refreshComplete');

    //    }, 1000);

    //};
});

usecar.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate) {
    console.log('MainCtrl');
    alert("aaa");
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
});



