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
            .state('app.signupdriver', {
                url: '/signupdriver',
                views: {
                    'TemplateWelCome': {
                        templateUrl: '/Index/SignupDriver'
                        
                    }
                }
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'TemplateWelCome': {
                        templateUrl: '/Index/Login',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('app.signuptype', {
                url: "/signuptype",
                views: {
                    'TemplateWelCome': {
                        templateUrl: '/Index/SignUpType'
                    }
                }
            })
            .state('app.homecreen', {
                url: '/homecreen',
                views: {
                    'TemplateWelCome': {
                        templateUrl: '/Index/HomeCreen'

                    }
                }
            });
       $urlRouterProvider.otherwise('app/homecreen');

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
.controller('LoginCtrl', function ($scope, $ionicHistory) {

    $scope.login = function()
    {

        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        //$state.go("app.home");
        //$scope.modal.show();
        window.location.href = "/index#/app/home";
    }

})
.controller('SignUpCtrl', function ($scope) {


});