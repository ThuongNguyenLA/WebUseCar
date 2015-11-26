var ProfileCtrl = ["$rootScope", "$scope", "$timeout", "CommonPopupCtrl", function ($rootScope, $scope, $timeout, CommonPopupCtrl) {
    $scope.rider = null;
    //$("#token").val(localStorage.getItem("token"));
    $scope.ChangeAvatar = function () {
        navigator.camera.getPicture(function (imageData) {
            var data = {
                fileName: "avatar.jpg",
                data: imageData
            };
            //alert(imageData);
            $("#avatar").attr("src", "data:image/jpeg;base64," + imageData);
            PostDataAjax("/api/Profile/UploadImage", data, function (respone) {
                $timeout(function () {
                    if (respone.message != "") {
                        CommonPopupCtrl.show("error:" + respone.message);
                        return;
                    }
                    else {
                        $("#avatar").attr("src", "data:image/jpeg;base64," + imageData);
                    }
                }, 500);
            }, function (e) { CommonPopupCtrl.show(e.responseText); }, true, "POST");
        }, function (error) {
            //loi khi chup

            CommonPopupCtrl.show(error);
        }, {
            quality: 60,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 600,
            targetHeight: 600,
            saveToPhotoAlbum: false
        });
    }

    function BindData() {
        PostDataAjax("/api/Profile/GetRider", "", function (respone) {
            $timeout(function () {

                if (respone.message != "") {
                    CommonPopupCtrl.show(respone.message);
                    return;
                }
                else {
                    $scope.rider = respone.rider;
                    $scope.txtFirstName = respone.rider.firstName;
                    //$scope.txtLastName = respone.rider.lastName;
                    $scope.txtEmail = respone.rider.email;
                    $scope.txtPhone = respone.rider.phone;
                    //$scope.txtAddress = respone.rider.address;
                    $scope.txtLastName = respone.rider.lastName;
                    $scope.txtCity = respone.rider.city;
                }
            }, 500);
        }, function (e) { CommonPopupCtrl.show(e.responseText); }, true, "GET");

        PostDataAjax("/api/List/GetCountries?languageCode=en-US", "",
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
         }, function () { }, false, "GET"
       );
        PostDataAjax("/api/List/GetStates", "",
         function (respone) {
             $timeout(function () {
                 if (respone && respone.results.length > 0) {
                     $timeout(function () {
                         $scope.States = respone;
                         //$scope.ddllState = "AL";
                     }, 10);
                 }
                 else {
                     CommonPopupCtrl.show("error");
                     // callback(null);
                 }
             }, 10);
         }, function () { }, false, "GET"
       );


    }

    $("#menuProfile a").css("color", "#48ccaa");
    BindData();
    // $scope.$digest();
    //$rootScope.$digest();
    $scope.SaveProfile = function () {
        // CommonPopupCtrl.show("login");
        var SendData = {
            "firstName": $("#txtFirstName").val(),
            "lastName": $("#txtLastName").val(),
            "email": $("#txtEmail").val(),
            "phone": $("#txtPhone").val(),
            "preferLanguage": "en-US",
            "country": $("#ddlCountry").val(), //$scope.country,
            "postalCode": null,
            "city": $("#txtCity").val(),
            "address": "",
            "state": $("#ddllState").val(),
            "password": $("#txtPassword").val()
        };
        PostDataAjax("/api/Profile/Save", SendData,
             function (respone) {
                 $timeout(function () {
                     if (respone) {
                         if (respone.message != "") {
                             CommonPopupCtrl.show(respone.message);
                             return;
                         }
                         else {
                             CommonPopupCtrl.show("Save success");
                             BindData();
                         }
                     }
                     else {
                         CommonPopupCtrl.show("error");
                         // callback(null);
                     }
                 }, 10);
             }, function (e) { debugger; CommonPopupCtrl.show(e.responseText); }, true
           );

    }





}];