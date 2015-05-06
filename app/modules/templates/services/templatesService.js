'use strict';

app.templates.factory('TemplatesService', ['$http', function ($http) {

    return {
        getTemplate: function (template) {
            return $http.get(app.serviceLocation + '/api/templates?id=' + template);
        },
        getTemplates: function () {
            return $http.get(app.serviceLocation + '/api/templates/');
        },
        getCategories: function () {
            return $http.get(app.serviceLocation + '/api/categories/');
        }

    };
}
]);
