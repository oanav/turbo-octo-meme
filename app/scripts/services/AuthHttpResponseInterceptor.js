﻿var AuthHttpResponseInterceptor = function ($timeout, $q, $injector) {
    var loginModal, $http, $state;

    // this trick must be done so that we don't receive
    // `Uncaught Error: [$injector:cdep] Circular dependency found`
    $timeout(function () {
        loginModal = $injector.get('loginModal');
        $http = $injector.get('$http');
        $state = $injector.get('$state');
    });

    return {
        responseError: function (rejection) {

            if (rejection.status !== 401) {
                return rejection;
            }

            console.log("Response Error 401", rejection);

            var deferred = $q.defer();

            loginModal()
              .then(function () {
                  deferred.resolve($http(rejection.config));
              })
              .catch(function () {
                  $state.go('/');
                  deferred.reject(rejection);
              });

            return deferred.promise;
        }
    };
}

AuthHttpResponseInterceptor.$inject = ['$timeout', '$q', '$injector'];