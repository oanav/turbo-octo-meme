'use strict';

app.invitation.controller('EditInvitationCtrl',
    ['$scope', '$location', '$window', '$modal', '$state', 'TemplatesService', 'InvitationsService',
        function ($scope, $location, $window, $modal, $state, TemplatesService, InvitationsService) {

            $scope.$root.title = 'Onvite | Edit Invitation';

            $scope.invitation = { details: {}, options: {}, guestList: [] };
            $scope.template = {};
            $scope.invitationCopy = {};
            $scope.form = { detailsForm: {}, guestListForm: {} };
            $scope.loader = {};
            $scope.readOnly = false;

            $scope.showEditPanel = true;

            var template = $scope.$root.$stateParams['template'];
            var id = $scope.$root.$stateParams['id'];

            if (!id) {
                $scope.loader.loading = true;
                TemplatesService.getTemplate(template)
                    .success(function (response) {
                    if (response) {
                        $scope.template = response;
                        $scope.invitation.template = $scope.template;
                        $scope.templatePath = "/modules/templates/views/templates/" + $scope.template.path + "/template.html";
                        $scope.loader.loading = false;
                    }
                })
                    .error(function (err) {
                    console.log(err);
                });
            } else {
                $scope.loader.loading = true;
                InvitationsService.getInvitation(id)
                    .success(function (response) {
                    if (response) {
                        $scope.invitation = response;

                        $scope.template = $scope.invitation.template;
                        $scope.templatePath = "/modules/templates/views/templates/" + $scope.template.path + "/template.html";

                        $scope.invitationCopy = angular.copy($scope.invitation);

                        $scope.loader.loading = false;
                    }
                })
                    .error(function (err) {
                    console.log(err);
                });
            }

            $scope.back = function () {
                $window.history.back();
            };

            $scope.navigate = function () {
                for (var form in $scope.form) {
                    if (form.$dirty) {
                        form.submit();
                    }
                };

            };

            $scope.openResponseModal = function () {
                var modalInstance = $modal.open({
                    templateUrl: '/modules/modals/views/responseModal.html',
                    controller: 'ResponseModalCtrl',
                    windowClass: 'response-modal',
                    backdrop: 'static',
                    resolve: {
                        guest: function () {
                            return $scope.guest;
                        }
                    }
                });
                //modalInstance.result.then(function () {
                //});
            };
            
            //show rsvp response form
            $scope.onSetResponse = function () {
                $scope.showResponseForm = true;
            };
            // close rsvp response form
            $scope.cancelResponse = function () {
                $scope.showResponseForm = false;
            };

        }]);