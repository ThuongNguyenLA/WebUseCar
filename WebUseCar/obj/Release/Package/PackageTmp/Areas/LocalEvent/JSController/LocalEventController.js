var LocalEventCtrl = function ($rootScope, $scope, $state, $stateParams, $ionicHistory) {
    $scope.ddlCat = $stateParams.id == null ? "-1" : $stateParams.id;
    if ($("#ddlCat") == "-1") {
        $(".localevent-cat").show();
        $(".localevent").hide();
    }
    else {
        $(".localevent-cat").hide();
        $(".localevent").show();
    }
    $scope.ChooseLocalEvent = function (val)
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
    
        if (val == "-1") {
            $(".localevent-cat").show();
            $(".localevent").hide();
        }
        else {
            $(".localevent-cat").hide();
            $(".localevent").show();
        }
    }
    $scope.Detail = function ()
    {
        $state.go("app.localeventdetail", {id:1});
    }




}
LocalEventCtrl.$inject = ["$rootScope", "$scope", "$state", "$stateParams", "$ionicHistory"];

