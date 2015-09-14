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
        if ($("#user").val() == "") {
            alert("Please input username");
            return;
        }
        if ($("#pass").val() == "") {
            alert("Please input password");
            return;
        }
        dataSend = {
            username: $("#user").val(), password: $("#pass").val(),grant_type : "password"
        };
        //dataSend = { strParam: "username=" + $("#user").val() + "&password=" + $("#pass").val() + "&grant_type=password" };
        try {

            $.post(RiderRootUrl + "/token", dataSend, function (respone) {
                    localStorage.setItem("token",respone.token_type+" "+ respone.access_token);
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $ionicHistory.clearHistory();
                    window.location.href = "/index#/app/home";
            }).fail(function (e) {alert(JSON.parse(e.responseText).error); });
            
        } catch (e) {
            alert(e)
        }
      
    }

})
.controller('SignUpCtrl', function ($scope, $timeout) {
    PostDataAjax("/api/List/GetCountries", "",
         function (respone) {
             $timeout(function () {
                 if (respone && respone.results.length > 0) {
                     $timeout(function () {
                         $scope.Countrys = respone;
                         $scope.ddlCountry = "VN";
                     }, 10);
                 }
                 else {
                     alert("error");
                    // callback(null);
                 }
             }, 10);
         }
       );
    $scope.Save = function () {
    dataSend ={
        Email: $("#txtEmail").val(), Password: $("#txtPassword").val(), FirstName: $("#txtFirstName").val(), LastName: $("#txtLastName").val(), Country:$("#ddlCountry").val(), Phone: $("#txtPhone").val()
    };
        PostDataAjax("/api/SignUp/Submit", dataSend,
             function (respone) {
                 $timeout(function () {
                     if (respone && respone.success) {
                         alert(respone.message);

                     }
                     else {
                         alert(respone.message);
                     }
                 }, 10);

             });
    }
});