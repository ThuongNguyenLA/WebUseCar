var FreeRideCtrl = function ($rootScope, $scope, $location, $cordovaContacts, $cordovaEmailComposer) {
    $("#menuFreeRide a").css("color", "#48ccaa");
   // alert("controller freeride available");
    $scope.getContact = function () {
        $cordovaContacts.pickContact().then(function (contactPicked) {
          //  alert(contactPicked);
        });
    }


    $scope.sendMail = function () {
        $cordovaEmailComposer.isAvailable().then(function () {
            // is available
            var email = {
                to: 'nguyendaominhthuong@gmail.com',
                cc: '',
                bcc: [],
                attachments: [

                ],
                subject: 'Cordova Icons',
                body: 'How are you? Nice greetings from Leipzig',
                isHtml: true
            };

            $cordovaEmailComposer.open(email).then(null, function () {
                // user cancelled email
            });
        }, function () {
            // not available
            console.log('mail not ready');
        });
    }
}
FreeRideCtrl.$inject = ["$rootScope", "$scope", "$location", "$cordovaContacts", "$cordovaEmailComposer"];