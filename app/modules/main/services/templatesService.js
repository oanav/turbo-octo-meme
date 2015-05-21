'use strict';

app.main.factory('TemplatesService', ['$http', function ($http) {

    return {
        getTemplate: function (template) {
            return $http.get(app.serviceLocation + '/api/templates?id=' + template);
        },
        getTemplates: function () {
            return $http.get(app.serviceLocation + '/api/templates/');
        },
        getSugesstions: function (id) {
            return $http.get(app.serviceLocation + '/api/template/suggestions?id='+id);
        },
        getCategories: function () {
            return $http.get(app.serviceLocation + '/api/categories/');
        }

    };
}
]);
