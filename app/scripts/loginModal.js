app.service('loginModal', function ($modal, $rootScope) {

    function assignCurrentUser(user) {
        $rootScope.currentUser = user;
        return user;
    }

    return function () {
        var instance = $modal.open({
            templateUrl: '/views/LoginModal.cshtml',
            controller: 'LoginCtrl',
            controllerAs: 'LoginCtrl'
        })

        return instance.result.then(assignCurrentUser);
    };

});