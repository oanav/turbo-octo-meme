'use strict';

app.controllers.controller('ViewInvitationCtrl',
    ['$scope', '$location', '$window', '$modal', '$state', 'TemplatesAPI', 'InvitationsAPI', 'CommentsAPI',
        function ($scope, $location, $window, $modal, $state, TemplatesAPI, InvitationsAPI, CommentsAPI) {

            $scope.$root.title = 'Onvite | Invitation';

            $scope.url = $state.current.url;

            $scope.invitation = {};
            $scope.template = {};
            $scope.guest = { name: '', email: '', rsvpResponse: {} };
            $scope.loader = {};
            $scope.readOnly = true;

            var guest_id = $scope.$root.$stateParams['guest_id'];
            var template = $scope.$root.$stateParams['template'];
            var id = $scope.$root.$stateParams['id'];

            if (!id) {
        $scope.loader.loading = true;
        TemplatesAPI.getTemplate(template)
          .success(function (response) {
                    if (response) {
                        $scope.template = response;
                        $scope.invitation.template = $scope.template;
                        $scope.templatePath = "/views/templates/" + $scope.template.path + "/template.html";
                        $scope.loader.loading = false;
                    }
                })
          .error(function (err) {
                    console.log(err);
                });
            } else {
        $scope.loader.loading = true;
        InvitationsAPI.getInvitation(id)
          .success(function (response) {
          if (response) {
            $scope.invitation = response;

            $scope.template = $scope.invitation.template;
            $scope.templatePath = "/views/templates/" + $scope.template.path + "/template.html";

            if (guest_id) {
              $scope.guest = getGuest(guest_id) || {};
            }

            getGuestListCount();

            $scope.loader.loading = false;
          }
        })
          .error(function (err) {
                    console.log(err);
                });
            }

            $scope.sidebarOpen = false;
            $scope.sidebarPath = '';
            $scope.openSidebar = function (title) {
        if (!$scope.sidebarOpened(title)) {
          $scope.sidebarOpen = true;
          $scope.sidebarPath = "/views/invitation/view/_" + title + ".html";
        } else {
          $scope.closeSidebar();
        }
            };
            $scope.sidebarOpened = function (title) {
        return $scope.sidebarOpen && $scope.sidebarPath.indexOf(title) > 0;
            };
            $scope.closeSidebar = function () {
        $scope.sidebarOpen = false;
        $scope.sidebarPath = '';
            };


            $scope.attending = {
        YES: 1,
        NO: 2,
        MAYBE: 3
            };

            $scope.openResponseModal = function () {
        var modalInstance = $modal.open({
          templateUrl: '/views/modals/responseModal.html',
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

            $scope.openMap = function () {
        var modalInstance = $modal.open({
          templateUrl: '/views/modals/mapModal.html',
          controller: 'MapModalCtrl',
          windowClass: 'map-modal',
          backdrop: 'static',
          resolve: {
            address: function () {
              return $scope.invitation.details.address;
            }
          }
        });
        //modalInstance.result.then(function () {
        //});
            };
            $scope.onSetResponse = function () {
        $scope.showResponseForm = true;
            };
            $scope.sendResponse = function () {
        var guestId = $scope.guest.id || null;
        InvitationsAPI.sendGuestResponse(guestId, $scope.guest.rsvpResponse)
          .success(function (response) {
                    $scope.showResponseForm = false;
                })
          .error(function (error) { });
            };
            $scope.cancelResponse = function () {
        $scope.guest.rsvpResponse = {};
        $scope.showResponseForm = false;
            };

            function getGuest(id) {
        if (!$scope.invitation.guestList) return;

        var guests = $scope.invitation.guestList;
        for (var i = 0; i < guests.length; i++) {
          if (guests[i].id == id)
            return guests[i];
        }
        return null;
            }

            function getGuestListCount() {
        var attending = 0, notAttending = 0, undecided = 0;
        $.each($scope.invitation.guestList, function (i, guest) {
          guest.rsvpResponse = guest.rsvpResponse || {};
          if (guest.rsvpResponse.attending == $scope.attending.YES) {
            attending++;
          } else if (guest.rsvpResponse.attending == $scope.attending.NO) {
            notAttending++;
          } else {
            undecided++;
          }

        });
        $scope.invitation.guestList.attendingNo = attending;
        $scope.invitation.guestList.notAttendingNo = notAttending;
        $scope.invitation.guestList.undecidedNo = undecided;
            }

            var timeout;
            $(".invitation").bind("click", function (source) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          if ($scope.sidebarOpen) {
            $scope.$apply($scope.closeSidebar);
          }
        });
            });

        }]);