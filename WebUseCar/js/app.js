// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //if (window.cordova && window.cordova.plugins.Keyboard) {
    //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //  cordova.plugins.Keyboard.disableScroll(true);

    //}
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider


   .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: '/templates/menu.html',
    controller: 'AppCtrl'
  })
     
    .state('app.refesh', {
        url: '/refesh',
        views: {
            'menuContent': {
                templateUrl: '/templates/refesh.html',
                controller: 'RefeshCtrl'
            }
        }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: '/templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
      .state('page', {
          url: "/page",
          templateUrl: "page.html",
          controller: 'MainCtrl'
      })
    //.state('app.state1', {
    //    url: "/state1",
    //    views: {
    //        'menuContent': {
    //            templateUrl: "state-1-center.html",
    //        },
    //        'right-menu': {
    //            templateUrl: "state-1-right.html"
    //        }
    //    }
    //})

    //.state('app.state2', {
    //    url: "/state2",
    //    views: {
    //        'menuContent': {
    //            templateUrl: "state-1-right.html"
    //        },
    //        'right-menu': {
    //            templateUrl: "state-1-right.html"
    //        }
    //    }
    //})

    .state('app.home', {
        url: "/home",
        views: {
            'TemplateWelCome': {
                templateUrl: '/Index/home',
                controller: 'HomeCtrl'
            }
        }
    })
    .state('app.login', {
        url: "/login",
        views: {
            'menuContent': {
                templateUrl: '/Profile/Login/Login',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('app.profile', {
        url: "/profile",
        views: {
            'menuContent': {
                templateUrl: '/Profile/Profile/Profile',
                controller: 'ProfileCtrl'
            }
        }
    })
      .state('app.mytrip', {
          url: "/mytrip",
          views: {
              'menuContent': {
                  templateUrl: '/MyTrip/MyTrip/Index',
                  controller: 'MyTripCtrl'
              }
          }
      })
      .state('app.freeride', {
          url: "/freeride",
          views: {
              'menuContent': {
                  templateUrl: '/Ride/FreeRide/Index',
                  controller: 'FreeRideCtrl'
              }
          }
      })
    .state('app.payment', {
        url: "/payment",
        views: {
            'menuContent': {
                templateUrl: '/Payment/Payment/Index',
                controller: 'PaymentCtrl'
            }
        }
    })
    .state('app.ride', {
        url: "/ride",
        views: {
            'menuContent': {
                templateUrl: '/Ride/Ride/Index',
                controller: 'RideCtrl'
            }
        }
    })
    .state('app.estimatefare', {
        url: "/estimatefare",
        views: {
            'menuContent': {
                templateUrl: '/Ride/Ride/EstimateFare',
                controller: 'EstimateFareCtrl'
            }
        }
    })
 .state('app.airport', {
     url: "/airport",
     views: {
         'menuContent': {
             templateUrl: '/Airport/Airport/Index',
             controller: 'AirportCtrl'
         }
     }
 })
    .state('app.localevent', {
        url: "/localevent",
        views: {
            'menuContent': {
                templateUrl: '/LocalEvent/LocalEvent/Index'
            }
        }
    })
    
    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/state1');

    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
