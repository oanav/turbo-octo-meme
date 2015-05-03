'use strict';

app.controllers.controller('TemplateCtrl',
    ['$scope', '$location', '$window', 'TemplatesAPI', 'InvitationsAPI',
    function ($scope, $location, $window, TemplatesAPI, InvitationsAPI) {
        $scope.$root.title = 'Onvite | Invitation';

        var id = $scope.$root.$stateParams['id'];
        TemplatesAPI.getTemplate(id)
            .success(function (response) {
                if (response) {
                    $scope.template = response;
                    $scope.templatePath = "/Views/Templates/" + $scope.template.path + "/template.html";
                }
            })
            .error(function (err) {
                console.log(err);
            });

    }]);
