var RideCtrl = function ($rootScope, $scope, $location, $ionicHistory,$state) {
    $scope.EstimateFare = function ()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        $state.go("app.estimatefare");
    }
}
RideCtrl.$inject = ["$rootScope", "$scope", "$location", "$ionicHistory", "$state"];