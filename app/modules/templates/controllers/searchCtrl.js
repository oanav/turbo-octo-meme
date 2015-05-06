'use strict';

app.templates.controller('SearchCtrl', ['$scope', '$window', '$location', 'SearchService', function ($scope, $window, $location, SearchService) {
    $scope.results = [];

    var category = $scope.$root.$stateParams['category'];
    $scope.category = category;

    var subcategory = $scope.$root.$stateParams['subcategory'];
    $scope.subcategory = subcategory;

    SearchService.getFilters()
    .success(function (response) {
        $scope.filters = response;
        $.each($scope.filters, function (i, array) {
            mapArrayObjects(array);
        });
    });

    $scope.$root.title = 'Onvite | ' + (subcategory || category) + ' invitations';

    if (subcategory) {
        SearchService.searchByCategory(subcategory)
            .success(function (response) {
                $scope.results = response;
                $.each($scope.results, function (i, item) {
                    item.imagePath = '/modules/templates/views/templates/' + item.path + '/snapshot.png';
                });
            })
            .error(function (error) {
                console.log(error);
            });
    }

    function mapArrayObjects(array) {
        $.each(array, function (i, item) {
            if (typeof item !== 'object') {
                array[i] = { id: i, name: item, checked: false };
            }
        });
    }

    $scope.clearFilters = function () {
        $.each($scope.filters, function (i, array) {
            $.each(array, function (i, item) {
                item.checked = false;
            });
        });
        $scope.search();
    }

    function checkedFilters() {
        var filters = { styles: [], themes: [], colors: [] };
        $.each($scope.filters, function (array) {
            $.each($scope.filters[array], function (i, item) {
                if (item.checked) {
                    filters[array].push(item);
                }
            });
        });
        return filters;
    }

    $scope.search = function () {
        var filters = checkedFilters();
        SearchService.search($scope.subcategory, filters)
            .success(function (response) {
                $scope.results = response;
                $.each($scope.results, function (i, item) {
                    item.imagePath = '/modules/templates/views/templates/' + item.path + '/snapshot.png';
                });
            })
            .error(function (error) { });
    }

    $scope.$on('$viewContentLoaded', function () {
        $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    });
}])