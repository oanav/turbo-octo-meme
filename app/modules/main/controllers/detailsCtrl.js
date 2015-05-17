'use strict';

app.main.controller('TemplateCtrl',
    ['$scope', '$location', '$window', 'TemplatesService', 'InvitationsService',
    function ($scope, $location, $window, TemplatesService, InvitationsService) {
        $scope.$root.title = 'Onvite | Invitation';

        var id = $scope.$root.$stateParams['id'];
        TemplatesService.getTemplate(id)
            .success(function (response) {
                if (response) {
                    $scope.template = response;
                    $scope.templatePath = "/modules/templates/" + $scope.template.path + "/template.html";
                }
            })
            .error(function (err) {
                console.log(err);
            });

    }]);
