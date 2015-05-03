'use strict';

app.controllers.controller('InvitationDetailsCtrl',
    ['$scope', '$location', 'InvitationsAPI',
    function ($scope, $location, InvitationsAPI) {

        $scope.reset = function () {
            $scope.invitation.details = angular.copy($scope.invitationCopy.details);
        }
        $scope.save = function () {
            $scope.loader.saving = true;
            if ($scope.invitation.id) {
                InvitationsAPI.saveInvitationDetails($scope.invitation.id, $scope.invitation.details)
                    .success(function (response) {
                        $scope.invitationCopy.details = angular.copy($scope.invitation.details);
                        $scope.form.detailsForm.$dirty = false;
                    })
                    .error(function (err) {
                        console.log(err);
                    }).then(function () {
                            $scope.loader.saving = false;
                    });
            } else {
                InvitationsAPI.createInvitation($scope.invitation)
                   .success(function (response) {
                       $scope.invitation.id = response.id;
                       $scope.invitationCopy.details = angular.copy($scope.invitation.details);
                   })
                   .error(function (err) {
                       console.log(err);
                   });
            }
        }

        setTimeout(function () { $scope.form.detailsForm.submit = $scope.save; }, 300);

    }])