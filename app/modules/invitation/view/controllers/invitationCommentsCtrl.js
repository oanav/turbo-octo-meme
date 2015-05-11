'use strict';

app.invitation.controller('InvitationCommentsCtrl',
    ['$scope', '$location', '$window', '$modal', '$state', 'CommentsService',
    function ($scope, $location, $window, $modal, $state, CommentsService) {

        $scope.newComment = {};

        $scope.submitComment = function () {
            var comment = {};
            if ($scope.guest.id) {
                comment.userId = $scope.guest.id;
                comment.userName = $scope.guest.name;
            }
            comment.message = $scope.newComment.message;
            comment.date = new Date();

            CommentsService.addComment($scope.invitation.id, comment)
            .success(function (response) {
                comment.id = response.id;
                if (!comment.userId) {
                    comment.userId = response.userId;
                    comment.userName = response.userName;
                }
                $scope.invitation.comments.push(comment);

            })
            .error(function (error) {
                console.log(error);
            });

            $scope.newComment = {};
        };
        
        $scope.removeComment = function (comment, $index) {
            CommentsService.deleteComment(comment.id)
                .success(function () {
                    $scope.invitation.comments.splice($index, 1);
                });
        };
//
//        $scope.newReply = {};
//        $scope.replyTo = {};
//
//        $scope.showReplyForm = function (comment) {
//            $scope.replyTo = comment;
//        }
//        $scope.replyFormVisible = function (comment) {
//            return $scope.replyTo.id == comment.id;
//        }
//        $scope.cancelReply = function () {
//            $scope.replyTo = {};
//        }
        
//        $scope.removeCommentReply = function (comment, reply, $index) {
//            CommentsService.deleteCommentReply(reply.id)
//                .success(function () {
//                    comment.replies.splice($index, 1);
//                });
//        };
//        
//        $scope.submitCommentReply = function (comment) {
//            var reply = {};
//            if ($scope.guest.id) {
//                reply.userId = $scope.guest.id;
//                reply.userName = $scope.guest.name;
//            }
//            reply.message = $scope.newReply.message;
//            reply.date = new Date();
//
//            CommentsService.addCommentReply(comment.id, reply)
//            .success(function (response) {
//                if (!reply.userId) {
//                    reply.userId = response.userId;
//                    reply.userName = response.userName;
//                }
//                $scope.comment.replies.push(reply);
//
//            })
//            .error(function (error) {
//                console.log(error);
//            });
//
//            $scope.newReply = {};
//            $scope.replyTo = {};
//        };

    }]);