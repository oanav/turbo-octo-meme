'use strict';

app.main.controller('TemplateCtrl',
    ['$scope', '$location', '$window', 'TemplatesService', 'InvitationsService',
        function ($scope, $location, $window, TemplatesService, InvitationsService) {
            $scope.$root.title = 'Onvite | Invitation';
            $scope.template = {};
            $scope.shareModel = {};

            var category = $scope.$root.$stateParams['category'];
            $scope.category = category;

            var subcategory = $scope.$root.$stateParams['subcategory'];
            $scope.subcategory = subcategory;

            var id = $scope.$root.$stateParams['id'];
            TemplatesService.getTemplate(id)
                .success(function (response) {
                    if (response) {
                        $scope.template = response;
                        $scope.imagePath = '/modules/templates/' + $scope.template.path + '/snapshot.png';
                        $scope.title = subcategory + " | Online Invitation - " + $scope.template.name;
    
                        $scope.shareModel = {
                            url: "http://google.com",
                            title: $scope.title,
                            imageUrl: $scope.imagePath
                        };
                    }
                })
                .error(function (err) {
                console.log(err);
            });

            TemplatesService.getSugesstions(id)
                .success(function (response) {
                if (response) {
                    $scope.suggestions = response;
                      
                }
            });
        }]);
