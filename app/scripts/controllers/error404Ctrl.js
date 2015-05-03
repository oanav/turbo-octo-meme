'use strict';

app.controllers.controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    $scope.$root.title = 'Error 404: Page Not Found';
}])