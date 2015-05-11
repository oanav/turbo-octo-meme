'use strict';

app.invitation.controller('InvitationOptionsCtrl',
    ['$scope', '$location', 'InvitationsService',
        function ($scope, $location, InvitationsService) {

            $scope.reset = function () {
                $scope.invitation.options = angular.copy($scope.invitationCopy.options);
            }
            $scope.save = function () {
                $scope.loader.saving = true;
                InvitationsService.saveInvitationOptions($scope.invitation.id, $scope.invitation.options)
                    .success(function (response) {
                    $scope.invitationCopy.options = angular.copy($scope.invitation.options);
                    $scope.form.optionsForm.$dirty = false;
                    $scope.loader.saving = false;
                })
                    .error(function (err) {
                    console.log(err);
                    $scope.loader.saving = false;
                })
            };

            setTimeout(function () { $scope.form.optionsForm.submit = $scope.save; }, 300);

        }]);