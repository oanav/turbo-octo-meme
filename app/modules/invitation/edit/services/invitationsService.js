app.invitation.factory('InvitationsService', ['$http', function ($http) {

    return {
        getInvitation: function (id) {
            return $http.get(app.serviceLocation + '/api/invitations?id=' + id);
        },
        createInvitation: function (invitation) {
            return $http.post(app.serviceLocation + '/api/invitations', invitation);
        },
        saveInvitationDetails: function (id, data) {
            return $http.put(app.serviceLocation + '/api/invitations/details/' + id, data);
        },
        saveInvitationOptions: function (id, data) {
            return $http.put(app.serviceLocation + '/api/invitations/options/' + id, data);
        },
        saveInvitationGuestList: function (id, data) {
            return $http.put(app.serviceLocation + '/api/invitations/guestList/' + id, data);
        },
        sendGuestResponse: function (guestId, data) {
            return $http.post(app.serviceLocation + '/api/invitations/guestresponse/' + guestId, data);
        },
        deleteInvitation: function (id) {
            return $http.delete(app.serviceLocation + '/api/invitations/' + id);
        }
    };
}
])