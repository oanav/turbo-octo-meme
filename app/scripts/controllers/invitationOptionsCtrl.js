'use strict';

app.controllers.controller('InvitationOptionsCtrl',
    ['$scope', '$location', 'InvitationsAPI',
    function ($scope, $location, InvitationsAPI) {

        $scope.reset = function () {
            $scope.invitation.options = angular.copy($scope.invitationCopy.options);
        }
        $scope.save = function () {
            $scope.loader.saving = true;
            if ($scope.invitation.id) {
                InvitationsAPI.saveInvitationOptions($scope.invitation.id, $scope.invitation.options)
                    .success(function (response) {
                        $scope.invitationCopy.options = angular.copy($scope.invitation.options);
                        $scope.form.optionsForm.$dirty = false;
                    })
                    .error(function (err) {
                        console.log(err);
                    }).then(function () {
                            $scope.loader.saving = false;
                    });
            } 
        }

        setTimeout(function () { $scope.form.optionsForm.submit = $scope.save; }, 300);

    }])