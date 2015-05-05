'use strict';

app.controllers.controller('InvitationGuestListCtrl',
    ['$scope', '$location', 'InvitationsAPI',
    function ($scope, $location, InvitationsAPI) {
        $scope.invitation.guestList = $scope.invitation.guestList || [];

        $scope.add = function () {
            if ($scope.email) {
                var email = $scope.email;
                var name = email.split("@")[0];
                $scope.invitation.guestList.push({ name: name, email: email });
                $scope.email = null;
            }
        };

        $scope.remove = function (guest) {
            var i = $scope.invitation.guestList.indexOf(guest);
            $scope.invitation.guestList.splice(i, 1);
            $scope.form.guestListForm.$dirty = true;
        };

        $scope.save = function () {
            $scope.loader.saving = true;
            InvitationsAPI.saveInvitationGuestList($scope.invitation.id, $scope.invitation.guestList)
                .success(function (respone) {
                    $scope.form.guestListForm.$dirty = false;
                })
                .error(function (error) { })
            .then(function () { $scope.loader.saving = false; });
        };

        setTimeout(function () { $scope.form.guestListForm.submit = $scope.save; }, 300);

    }])