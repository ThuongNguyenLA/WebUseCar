var usecar = angular.module('starter.controllers', []);
usecar.controller("LoginCtrl", LoginCtrl);
usecar.controller("ProfileCtrl", ProfileCtrl);
usecar.controller("RideCtrl", RideCtrl);
usecar.controller("EstimateFareCtrl", EstimateFareCtrl);
usecar.controller("AirportCtrl", AirportCtrl);
usecar.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $location, $state, $ionicHistory) {
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
        $scope.modal.show();
    };
    $scope.FooterMenuActive = function (ev, id) {
        $(".icon-footer").find("span").removeClass("active");
        $("#" + id).addClass("active");
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        switch (id)
        {
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
usecar.controller('HomeCtrl', function ($scope, $ionicPopup, $timeout, $ionicSlideBoxDelegate) {
    $scope.images = [
                            "/img/1.jpg",
                            "/img/2.jpg",
                            "/img/3.jpg"
    ]


    $scope.slideVisible = function (index) {
        if (index < $ionicSlideBoxDelegate.currentIndex() - 1
       || index > $ionicSlideBoxDelegate.currentIndex() + 1) {
            return false;
        }

        return true;
    }

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
        } catch (e)
        {
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
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
      { id: 20 },
      { id: 21 },
      { id: 22 },
      { id: 23 },
      { id: 24 },
      { id: 25 },
      { id: 26 },
      { id: 27 },
      { id: 28 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32 },
      { id: 33 },
      { id: 34 },
      { id: 35 },
      { id: 36 },
      { id: 37 },
      { id: 38 },
      { id: 39 },
      { id: 40 },
      { id: 41 },
      { id: 42 },
      { id: 43 },
      { id: 44 },
      { id: 45 },
      { id: 46 },
      { id: 47 },
      { id: 48 },
      { id: 49 },
      { id: 50 }
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
})
;

//angular.module('starter', ['ionic'])

//    .run(function ($ionicPlatform) {
//        $ionicPlatform.ready(function () {
//            if (window.StatusBar) {
//                // org.apache.cordova.statusbar required
//                StatusBar.styleDefault();
//            }
//        });
//    })

//    .config(function ($stateProvider, $urlRouterProvider) {
//        $stateProvider

//            .state('app', {
//                url: "/app",
//                abstract: true,
//                templateUrl: "main.html"
//            })


//            .state('app.state1', {
//                url: "/state1",
//                views: {
//                    'menuContent': {
//                        templateUrl: "state-1-center.html",
//                    },
//                    'right-menu': {
//                        templateUrl: "state-1-right.html"
//                    }
//                }
//            })

//            .state('app.state2', {
//                url: "/state2",
//                views: {
//                    'menuContent': {
//                        templateUrl: "state-2-center.html"
//                    },
//                    'right-menu': {
//                        templateUrl: "state-2-right.html"
//                    }
//                }
//            })

//        // if none of the above states are matched, use this as the fallback
//        $urlRouterProvider.otherwise('/app/state1');
//    })

//    .controller('MainCtrl', function ($scope, $ionicSideMenuDelegate) {
//        console.log('MainCtrl');

//        $scope.toggleLeft = function () {
//            alert("55");
//            $ionicSideMenuDelegate.toggleLeft();
//        };
//    })
//.controller('MapCtrl', function ($scope, $ionicLoading, $compile) {
//    alert("1");
//})
