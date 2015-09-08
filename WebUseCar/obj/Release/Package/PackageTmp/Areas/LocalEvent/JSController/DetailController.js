var LocalEventDetailCtrl = function ($rootScope, $scope, $state, $stateParams, $ionicHistory) {
    $scope.ddlCat = $stateParams.id;
    $scope.ChooseLocalEvent = function (val) {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        $state.go("app.localevent", { id: val });
    }





}
LocalEventDetailCtrl.$inject = ["$rootScope", "$scope", "$state", "$stateParams", "$ionicHistory"];

