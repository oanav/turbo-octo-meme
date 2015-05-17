'use strict';

app.main.factory('SearchService', ['$http', function ($http) {

    return {
        searchByCategory: function (category) {
            return $http.get(app.serviceLocation + '/api/search?categoryName=' + category);
        },
        search: function (category, filters) {
            return $http.post(app.serviceLocation + '/api/search?category=' + category, filters);
        },
        searchText: function (text) {
            return $http.get(app.serviceLocation + '/api/search/?text=' + text);
        },
        getFilters: function () {
            return $http.get(app.serviceLocation + '/api/search/filters');
        }
    };
}
]);
