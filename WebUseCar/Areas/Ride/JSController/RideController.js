var RideCtrl = function ($rootScope, $scope, $location, $ionicHistory, $state, googleDirections) {
    $scope.EstimateFare = function ()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        $state.go("app.estimatefare");
    }
    $scope.RequestRide = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        $location.path("/app/rideestimatefare/1");
    }
}
RideCtrl.$inject = ["$rootScope", "$scope", "$location", "$ionicHistory", "$state", "googleDirections"];