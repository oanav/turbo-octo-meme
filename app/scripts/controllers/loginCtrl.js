'use strict';

app.controllers.controller('LoginCtrl', ['$scope', '$location', '$window', 'UsersAPI', function ($scope, $location, $window, UsersAPI) {
    $scope.$root.title = 'Onvite | Log In';

    $scope.cancel = $scope.$dismiss;

    $scope.login = function (email, password) {
        //UsersAPI.login(email, password).then(function (user) {
        //    $scope.$close(user);
        //});
        $scope.$close();
    };

}])
