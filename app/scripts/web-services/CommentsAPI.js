app.webservices.factory('CommentsAPI', ['$http', function ($http) {

    return {
        addComment: function (invitationId, comment) {
            return $http.post(app.serviceLocation + '/api/comments?invitationId=' + invitationId, comment);
        },
        deleteComment: function (id) {
            return $http.delete(app.serviceLocation + '/api/comments/' + id);
        },
        addCommentReply: function (commentId, commentReply) {
            return $http.post(app.serviceLocation + '/api/comments/' + commentId + '/commentReplies', commentReply);
        },
        deleteCommentReply: function (id) {
            return $http.delete(app.serviceLocation + '/api/commentReplies/' + id);
        }
    };
}
])