var LocalEventCtrl = function ($rootScope, $scope, $state, $stateParams, $ionicHistory, $timeout, CommonPopupCtrl) {
    //if ($stateParams.id != null) {

    //    $(".localevent-cat").hide();
    //    $(".localevent").show();
    //}
    //else {
    //    $(".localevent-cat").show();
    //    $(".localevent").hide();

    //}
   
    function initiate_geolocation() {
        navigator.geolocation.getCurrentPosition(handle_geolocation_query);
    }

    function handle_geolocation_query(position) {
        $scope.lat=position.coords.latitude;
        $scope.long=position.coords.longitude;
        PostDataAjax("/api/LocalEvent/GetCategoryLocalEvents?lat=" + position.coords.latitude + "&lng="+position.coords.longitude, "", function (respone) {
            $timeout(function () {
                if (respone.message != "") {
                    CommonPopupCtrl.show(respone.message);
                    return;
                }
                $rootScope.lstCat = respone.results;
                //$timeout(function () {
                //    if ($stateParams.id != null) {
                //        //$("#ddlCat").val($stateParams.id);
                //        //BindData($stateParams.id);
                //    }
                //}, 500);
            }, 500);
        }, function (e) {  CommonPopupCtrl.show(e.responseText);},true, "GET");
    }
    initiate_geolocation();
    $scope.ddlCat = ($stateParams.id == null ? "-1" : $stateParams.id);
    //if ($stateParams.id != null)
    //{
    //    //debugger;
    //    //$("#ddlCat").val($stateParams.id);
    //    //BindData($stateParams.id);
    //}
    //if ($scope.ddlCat == "-1" || $scope.ddlCat == "") {
    //    $(".localevent-cat").show();
    //    $(".localevent").hide();
    //}
    //else {
    //    $(".localevent-cat").hide();
    //    $(".localevent").show();
    //}
    $scope.SelectCat = function (catID) {
        $scope.ddlCat = catID;
        $("#ddlCat").val(catID);
        $(".localevent-cat").hide();
        $(".localevent").show();
        PostDataAjax("/api/LocalEvent/GetLocalEvents?lat=" + $scope.lat + "&lng=" + $scope.long + "&eventCategory=" + catID, "", function (respone) {
            $timeout(function () {
                if (respone.message != "") {
                    CommonPopupCtrl.show(respone.message);
                    return;
                }
                else {
                    $rootScope.lstItem = respone.list;
                }
            }, 500);
        }, function (e) { CommonPopupCtrl.show(e.responseText); }, true, "GET");
    }

    $scope.ChooseLocalEvent = function (catID)
    {
        BindData(catID);
    }
    function BindData(catID)
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicHistory.clearHistory();
        PostDataAjax("/api/LocalEvent/GetLocalEvents?lat=" + $scope.lat + "&lng=" + $scope.long + "&eventCategory=" + catID, "", function (respone) {
            $timeout(function () {
                if (respone.message != "") {
                    CommonPopupCtrl.show(respone.message);
                    return;
                }
                else {
                    $rootScope.lstItem = respone.list;
                }
            }, 500);
        }, function (e) { CommonPopupCtrl.show(e.responseText); }, true, "GET");
        if (catID == "-1") {
            $(".localevent-cat").show();
            $(".localevent").hide();
            $("#pnDetail").hide();
        }
        else {
            $(".localevent-cat").hide();
            $(".localevent").show();
            $("#pnDetail").hide();
        }
    }
    $scope.Detail = function (itemid)
    {
        $('#description').css('height', '45px');
        $('#description').css('overflow', 'hidden');
        $("#readMore").show();
        //$state.go("app.localeventdetail", { id: itemid });
        $(".localevent-cat").hide();
        $(".localevent").hide();
        $("#pnDetail").show();
        if ($rootScope.lstItem != null && $rootScope.lstItem != undefined) {
            $rootScope.lstItem.forEach(function (obj) {
                if (obj.id == itemid) {
                    $scope.item = obj;
                    return;
                }
            })
        }


    }




}
LocalEventCtrl.$inject = ["$rootScope", "$scope", "$state", "$stateParams", "$ionicHistory", "$timeout", "CommonPopupCtrl"];

