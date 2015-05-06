'use strict';

app.modals.controller('MapModalCtrl',
    ['$scope', '$modalInstance', 'address',
    function ($scope, $modalInstance, address) {

        $scope.address = address;

        $scope.map = { center: { latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
        $scope.options = { scrollwheel: false };

        $scope.close = function () {
            $modalInstance.dismiss();
        }
    }]);