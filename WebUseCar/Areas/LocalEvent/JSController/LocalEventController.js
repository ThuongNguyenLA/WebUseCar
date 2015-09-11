var LocalEventCtrl = function ($rootScope, $scope, $state, $stateParams, $ionicHistory) {
   
    function initiate_geolocation() {
        navigator.geolocation.getCurrentPosition(handle_geolocation_query);
    }

    function handle_geolocation_query(position) {
        PostDataAjax("/api/LocalEvent/GetCategoryLocalEvents?lat=" + position.coords.latitude + "&lng="+position.coords.longitude, "", function (respone) {
            if (respone.message != "") {
                alert(respone.message);
                return;
            }
            $scope.lstCat = respone.list;
        }, function (e) {  alert(e.responseText);},true, "GET");
    }
    initiate_geolocation();
    //var dataSend = { lat: 10.779078, lng:106.679229};
   
            
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

