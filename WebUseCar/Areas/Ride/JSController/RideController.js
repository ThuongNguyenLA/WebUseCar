var RideCtrl = function ($rootScope, $scope, $location, $ionicHistory, $state, googleDirections) {
    $scope.EstimateFare = function ()
    {


        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        $rootScope.Pickup = $("#txtPickup").val();//$scope.txtPickup;
        $rootScope.Dropoff = $("#txtDropoff").val();// $scope.txtDropoff;
        $state.go("app.estimatefare");
    }
    $scope.RequestRide = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        $rootScope.Pickup = $("#txtPickup").val();//$scope.txtPickup;
        $rootScope.Dropoff = $("#txtDropoff").val();// $scope.txtDropoff;
        $location.path("/app/rideestimatefare/1");
    }
   
}
RideCtrl.$inject = ["$rootScope", "$scope", "$location", "$ionicHistory", "$state", "googleDirections"];