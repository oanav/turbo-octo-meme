/* global app */
'use strict';

var appConfig = function ($stateProvider, $locationProvider, $httpProvider, ngToast) {

    //  $locationProvider.html5Mode(true);
    //  $httpProvider.interceptors.push(AuthHttpResponseInterceptor);
     ngToast.configure({
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      maxNumber: 3,
      animation: 'slide'
    });
};

appConfig.$inject = ['$stateProvider', '$locationProvider', '$httpProvider', 'ngToastProvider'];

// Gets executed during the provider registrations and configuration phase. Only providers and constants can be
// injected here. This is to prevent accidental instantiation of services before they have been fully configured.
app.config(appConfig);

//app.serviceLocation = 'http://onviteswebservices.azurewebsites.net'; //deployment environment
app.serviceLocation = 'http://localhost:9001'; //local environment