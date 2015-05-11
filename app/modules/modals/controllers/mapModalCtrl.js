'use strict';

app.modals.controller('MapModalCtrl',
    ['$scope', '$modalInstance', 'address',
    function ($scope, $modalInstance, address) {
        $scope.address = address;

        $scope.map = { 
            center: { 
                latitude: address.latitude, 
                longitude: address.longitude }, 
            zoom: 4,
            options: { scrollwheel: false }
        };
        
        $scope.marker = {
              id: 0,
              coords: {
                latitude: address.latitude,
                longitude: address.longitude
              },
              options: { draggable: true }
        };

        $scope.close = function () {
            $modalInstance.dismiss();
        }
    }]);