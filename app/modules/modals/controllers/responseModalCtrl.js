'use strict';

app.modals.controller('ResponseModalCtrl',
    ['$scope', '$modalInstance', 'InvitationsService', 'guest',
    function ($scope, $modalInstance, InvitationsService, guest) {

    $scope.guest = guest || {};

    $scope.send = function () {
        var guestId = $scope.guest.id || null;
        InvitationsService.sendGuestResponse(guestId, $scope.guest.rsvpResponse)
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