﻿var ProfileCtrl = function ($rootScope, $scope, $timeout, CommonPopupCtrl) {

    function BindData()
    {
        
        PostDataAjax("/api/Profile/GetRider", "", function (respone) {
            $timeout(function () {
                if (respone.message != "") {
                    CommonPopupCtrl.show(respone.message);
                    return;
                }
                else {
                    $scope.rider = respone.rider;
                    $scope.txtFirstName = respone.rider.firstName;
                    $scope.txtLastName = respone.rider.lastName;
                    $scope.txtEmail = respone.rider.email;
                    $scope.txtPhone = respone.rider.phone;
                    $scope.txtAddress = respone.rider.address;
                    $scope.txtLastName = respone.rider.lastName;
                    $scope.txtCity = respone.rider.city;
                }
            }, 500);
        }, function (e) { CommonPopupCtrl.show(e.responseText); }, true, "GET");

        PostDataAjax("/api/List/GetCountries", "",
         function (respone) {
             $timeout(function () {
                 if (respone && respone.results.length > 0) {
                     $timeout(function () {
                         $scope.Countrys = respone;
                         $scope.ddlCountry = "VN";
                     }, 10);
                 }
                 else {
                     CommonPopupCtrl.show("error");
                     // callback(null);
                 }
             }, 10);
         }
       );
        PostDataAjax("/api/List/GetStates", "",
         function (respone) {
             $timeout(function () {
                 if (respone && respone.results.length > 0) {
                     $timeout(function () {
                         $scope.States = respone;
                         $scope.ddllState = "AL";
                     }, 10);
                 }
                 else {
                     CommonPopupCtrl.show("error");
                     // callback(null);
                 }
             }, 10);
         }
       );

        
    }

    $("#menuProfile a").css("color", "#48ccaa");
    BindData();
   
    $scope.SaveProfile = function ()
    {
        // CommonPopupCtrl.show("login");
        debugger;
       
        PostDataAjax("/api/Profile/Save", $scope.rider,
             function (respone) {
                 $timeout(function () {
                     if (respone && respone.results.length > 0) {
                         if (respone.message != "") {
                             CommonPopupCtrl.show(respone.message);
                             return;
                         }
                         else {
                             CommonPopupCtrl.show("Save success");
                         }
                     }
                     else {
                         CommonPopupCtrl.show("error");
                         // callback(null);
                     }
                 }, 10);
             }, function (e) { debugger; CommonPopupCtrl.show(e.responseText); }
           );

    }


    
    

}
ProfileCtrl.$inject = ["$rootScope", "$scope", "$timeout", "CommonPopupCtrl"];