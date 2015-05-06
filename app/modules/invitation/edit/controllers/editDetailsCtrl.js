'use strict';

app.invitation.controller('InvitationDetailsCtrl',
    ['$scope', '$location', 'InvitationsService', 'notifications',
        function ($scope, $location, InvitationsService, notifications) {

            $scope.reset = function () {
        $scope.invitation.details = angular.copy($scope.invitationCopy.details);
            };
            $scope.navigate = function () {
        if ($scope.form.detailsForm.$dirty) {
          $scope.save();
        }
            };
            $scope.save = function () {
                $scope.loader.saving = true;
                if ($scope.invitation.id) {
          InvitationsService.saveInvitationDetails($scope.invitation.id, $scope.invitation.details)
            .success(function (response) {
            $scope.invitationCopy.details = angular.copy($scope.invitation.details);
            $scope.form.detailsForm.$dirty = false;
            $scope.loader.saving = false;
          })
            .error(function (err) {
            $scope.loader.saving = false;
            notifications.showError({ message: 'An error has occurred while saving your invitation, <em>please try again.</em>' });
          })
                } else {
          InvitationsService.createInvitation($scope.invitation)
            .success(function (response) {
            $scope.invitation.id = response.id;
            $scope.invitationCopy.details = angular.copy($scope.invitation.details);
            $scope.loader.saving = false;
          })
            .error(function (err) {
            $scope.loader.saving = false;
            notifications.showError({ message: 'An error has occurred while trying to create your invitation, <em>please try again.</em>' });
          })
                }
            };

            setTimeout(function () { $scope.form.detailsForm.submit = $scope.save; }, 300);

        }])