var FreeRideCtrl = function ($rootScope, $scope, $location, $cordovaContacts, $cordovaEmailComposer, CommonPopupCtrl, $cordovaSms) {
    $("#menuFreeRide a").css("color", "#48ccaa");
   // alert("controller freeride available");
    $scope.getContact = function () {
        $cordovaContacts.pickContact().then(function (contactPicked) {
             //alert(contactPicked);
            console.log(contactPicked);// you can see all values of result in console log
            var options = {
                android: {
                    intent: 'INTENT'  // send SMS with the native android SMS messaging
                }
            };
            if(contactPicked && contactPicked.phoneNumbers){
                $cordovaSms.send(contactPicked.phoneNumbers[0].value, 'SMS content', options)
              .then(function() {
                  // Success! SMS was sent
                  alert('send sms success');
              }, function(error) {
                  // An error occurred
              });
            }
        
        });
    }
    $scope.sendMail = function () {
        try {
            $cordovaEmailComposer.isAvailable().then(function () {
                // is available
                var email = {
                    to: '',
                    cc: '',
                    bcc: [],
                    attachments: [

                    ],
                    subject: 'Welcome UseCar App',
                    body: 'Now, you can try the UseCar App to easy take the Taxi',
                    isHtml: true
                };

                $cordovaEmailComposer.open(email).then(null, function () {
                    // user cancelled email
                });
            }, function () {
                // not available
                //console.log('mail not ready');
                CommonPopupCtrl.show("Please, setup email to invite new contact");
            });

        } catch (e) {
            CommonPopupCtrl.show("Please, setup email to invite new contact");
        }
        
    }
}
FreeRideCtrl.$inject = ["$rootScope", "$scope", "$location", "$cordovaContacts", "$cordovaEmailComposer", "CommonPopupCtrl", "$cordovaSms"];