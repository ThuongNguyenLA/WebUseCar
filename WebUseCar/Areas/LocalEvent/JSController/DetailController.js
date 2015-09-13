var LocalEventDetailCtrl = function ($rootScope, $scope, $state, $stateParams, $ionicHistory) {
    $scope.ddlCat = $stateParams.id;
    $("#ddlCat").val($stateParams.id);
    $scope.ChooseLocalEvent = function (val) {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        $state.go("app.localevent", { id: val });
    }
    if ($rootScope.lstItem != null && $rootScope.lstItem != undefined) {
        $rootScope.lstItem.forEach(function (obj) {
            if (obj.id == $stateParams.id) {
                $scope.item = obj;
                return;
            }
        })
    }
    



}
LocalEventDetailCtrl.$inject = ["$rootScope", "$scope", "$state", "$stateParams", "$ionicHistory"];

