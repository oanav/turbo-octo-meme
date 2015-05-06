'use strict';

app.modals.controller('LoginCtrl', ['$scope', '$location', '$window', 'UsersService', function ($scope, $location, $window, UsersService) {
    $scope.$root.title = 'Onvite | Log In';

    $scope.cancel = $scope.$dismiss;

    $scope.login = function (email, password) {
        //UsersService.login(email, password).then(function (user) {
        //    $scope.$close(user);
        //});
        $scope.$close();
    };

}])
