angular.module('app', ['ionic'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        //$routeProvider.when('/signup', {
        //     templateUrl: '/Index/Signup'
        //     //controller: SignUpCtrl
        // });
    //.state('app.signup', {
    //    url: '/signup',
    //    abstract: true,
    //    templateUrl: '/Index/Signup',
    //    controller: 'SignUpCtrl'
    //}
    //)
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: '/templates/menuwelcome.html'
            })
            .state('app.signup', {
                url: '/signup',
                views: {
                    'TemplateWelCome': {
                        templateUrl: '/Index/Signup',
                        controller: 'SignUpCtrl'
                    }
                }
            })
        .state('app.welcome', {
            url: '/welcome',
            views: {
                'TemplateWelCome': {
                    templateUrl: '/Index/WelCome',
                    controller: 'WelComeCtrl'
                }
            }
        });
       $urlRouterProvider.otherwise('app/welcome');

    })
.controller('WelComeCtrl', function ($scope, $ionicSlideBoxDelegate,$location) {

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

    $scope.GoSignUp = function ()
    {
        $location.path("/app/signup");
    }

})
.controller('SignUpCtrl', function ($scope) {


});