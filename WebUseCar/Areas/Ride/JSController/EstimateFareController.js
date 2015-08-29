var EstimateFareCtrl = function ($rootScope, $scope, $location) {
    $scope.EstimateFare = function ()
    {
        $location.path("/app/estimatefare");
    }
}
EstimateFareCtrl.$inject = ["$rootScope", "$scope", "$location"];