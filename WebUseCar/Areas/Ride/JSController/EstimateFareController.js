var EstimateFareCtrl = function ($rootScope, $scope, $location, $ionicHistory) {
    $scope.EstimateFare = function ()
    {
        $location.path("/app/estimatefare");
    }
    $scope.BookCar = function () {
        //alert("s");
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        $location.path("/app/rideestimatefare/2");

    }
}
EstimateFareCtrl.$inject = ["$rootScope", "$scope", "$location", "$ionicHistory"];