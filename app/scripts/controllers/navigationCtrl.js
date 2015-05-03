'use strict';

app.controllers.controller('NavigationCtrl', ['$scope', '$rootScope', '$location', '$window', 'TemplatesAPI', function ($scope, $rootScope, $location, $window, TemplatesAPI) {
    TemplatesAPI.getCategories()
        .success(function (response) {
            $scope.categories = response;
            $rootScope.categories = $scope.categories;
        })
        .error(function (error) { });
}]);