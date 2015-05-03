'use strict';

app.controllers.controller('EditInvitationCtrl',
    ['$scope', '$location', '$window', '$modal', '$state', 'TemplatesAPI', 'InvitationsAPI',
        function ($scope, $location, $window, $modal, $state, TemplatesAPI, InvitationsAPI) {

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
        TemplatesAPI.getTemplate(template)
          .success(function (response) {
                    if (response) {
                        $scope.template = response;
                        $scope.invitation.template = $scope.template;
                        $scope.templatePath = "/Views/Templates/" + $scope.template.path + "/template.html";
                        $scope.loader.loading = false;
                    }
                })
          .error(function (err) {
                    console.log(err);
                });
            }
            else {
        $scope.loader.loading = true;
        InvitationsAPI.getInvitation(id)
          .success(function (response) {
          if (response) {
            $scope.invitation = response;

            $scope.template = $scope.invitation.template;
            $scope.templatePath = "/Views/Templates/" + $scope.template.path + "/template.html";

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

            }
            // close response form
            $scope.cancelResponse = function () {
        $scope.guest.rsvpResponse = {};
        $scope.showResponseForm = false;
            };

            //function initializeGMapSearchBox() {
            //    // Create the search box and link it to the UI element.
            //    var input = /** @type {HTMLInputElement} */(
            //        document.getElementById('address'));

            //    var searchBox = new google.maps.places.SearchBox((input));

            //    // Listen for the event fired when the user selects an item from the
            //    // pick list. Retrieve the matching places for that item.
            //    google.maps.event.addListener(searchBox, 'places_changed', function () {
            //        var places = searchBox.getPlaces();

            //        if (places.length == 0) {
            //            return;
            //        }
            //    });

            //}

        }])