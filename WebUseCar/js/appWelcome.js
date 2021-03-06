﻿var usecar = angular.module('app', ['ionic']);
usecar.factory('CommonPopupCtrl', ['$ionicPopup', '$timeout', function ($ionicPopup, $timeout) {
    helper = {};

    helper.show = function (strPopupContent) {
        // $scope.data = {}

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
            console.log('Tapped!', res);
        });
    };
    return helper;
}]);
usecar.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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

    }])
.controller('WelComeCtrl', ['$rootScope','$scope', '$ionicSlideBoxDelegate', '$location', function ($rootScope,$scope, $ionicSlideBoxDelegate, $location) {
    
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

}])
.controller('LoginCtrl', ['$rootScope','$scope', '$ionicHistory', 'CommonPopupCtrl', function ($rootScope,$scope, $ionicHistory, CommonPopupCtrl) {
    
    $scope.login = function()
    {
        if ($("#user").val() == "") {
            CommonPopupCtrl.show("Please input username");
            return;
        }
        if ($("#pass").val() == "") {
            CommonPopupCtrl.show("Please input password");
            return;
        }
        dataSend = {
            username: $("#user").val(), password: $("#pass").val(),grant_type : "password"
        };
        try {
            $("#loading").show();
            $.post(RiderRootUrl + "/token", dataSend, function (respone) {
                    localStorage.setItem("token",respone.token_type+" "+ respone.access_token);
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $ionicHistory.clearHistory();
                 
                    window.location.href = "/index#/app/home";
            }).fail(function (e) {
                $("#loading").hide();
                //CommonPopupCtrl.show(JSON.parse(e.responseText).error);
            });
        } catch (e) {
            //alert(e)
        }
      
    }

}])
.controller('SignUpCtrl', ['$scope', '$timeout', 'CommonPopupCtrl', function ($scope, $timeout, CommonPopupCtrl) {
    PostDataAjax("/api/List/GetCountries?languageCode=en-US", "",
         function (respone) {
             $timeout(function () {
                 if (respone && respone.results.length > 0) {
                     $timeout(function () {
                         $scope.Countrys = respone;
                         $scope.ddlCountry = "VN";
                     }, 10);
                 }
                 else {
                     CommonPopupCtrl.show("error");
                    // callback(null);
                 }
             }, 10);
         }, function (e) { CommonPopupCtrl.show(e.responseText); },false,"GET"
    );
    $scope.Save = function () {
        dataSend = {
            Email: $("#txtEmail").val(), Password: $("#txtPassword").val(), FirstName: $("#txtFirstName").val(), LastName: $("#txtLastName").val(), Country: $("#ddlCountry").val(), Phone: $("#txtPhone").val()
        };
        PostDataAjax("/api/SignUp/Submit", dataSend,
                 function (respone) {
                     $timeout(function () {
                         if (respone && respone.success) {
                             CommonPopupCtrl.show(respone.message);

                         }
                         else {
                             CommonPopupCtrl.show(respone.message);
                         }
                     }, 10);

                 });
    };
}]);