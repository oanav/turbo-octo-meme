app.controllers.controller('ResponseModalCtrl',
    ['$scope', '$modalInstance', 'InvitationsAPI', 'guest',
    function ($scope, $modalInstance, InvitationsAPI, guest) {

    $scope.guest = guest || {};

    $scope.send = function () {
        var guestId = $scope.guest.id || null;
        InvitationsAPI.sendGuestResponse(guestId, $scope.guest.rsvpResponse)
            .success(function (response) {
                $modalInstance.close($scope.guest);
            })
            .error(function (error) { });

    };

    $scope.cancel = function () {
        $scope.guest = {};
        $modalInstance.dismiss();
    }
}]);