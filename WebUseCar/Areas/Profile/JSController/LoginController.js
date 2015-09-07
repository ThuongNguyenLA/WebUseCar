var LoginCtrl = function ($rootScope, $scope, $ionicHistory) {
    $scope.login()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        //$state.go("app.home");
        //$scope.modal.show();
        window.location.href = "/index#/app/home";

    }
}
LoginCtrl.$inject = ["$rootScope", "$scope", "$ionicHistory"];