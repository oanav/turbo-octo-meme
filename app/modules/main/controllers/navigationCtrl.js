'use strict';

app.main.controller('NavigationCtrl', ['$scope', '$rootScope', '$location', '$window', 'TemplatesService', function ($scope, $rootScope, $location, $window, TemplatesService) {
    TemplatesService.getCategories()
        .success(function (response) {
            $scope.categories = response;
            $rootScope.categories = $scope.categories;
        })
        .error(function (error) { });
}]);