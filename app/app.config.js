/* global app */
'use strict';

var appConfig = function ($stateProvider, $locationProvider, $httpProvider, notificationsConfigProvider) {

    //  $locationProvider.html5Mode(true);
    //  $httpProvider.interceptors.push(AuthHttpResponseInterceptor);
    
    notificationsConfigProvider.setAutoHide(false);
    notificationsConfigProvider.setAcceptHTML(true);
};

appConfig.$inject = ['$stateProvider', '$locationProvider', '$httpProvider', 'notificationsConfigProvider'];

// Gets executed during the provider registrations and configuration phase. Only providers and constants can be
// injected here. This is to prevent accidental instantiation of services before they have been fully configured.
app.config(appConfig);

//app.serviceLocation = 'http://onviteswebservices.azurewebsites.net'; //deployment environment
app.serviceLocation = 'http://localhost:9001'; //local environment