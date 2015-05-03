'use strict';

var appConfig = function ($stateProvider, $locationProvider, $httpProvider) {

    // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
    // ------------------------------------------------------------------------------------------------------------

    $stateProvider
        .state('home', {
        url: '/',
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl'
    })
        .state('login', {
        url: '/account/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
    })
        .state('browseCategory', {
        url: '/invitations/:category/:subcategory',
        templateUrl: '/views/browse/list.html',
        controller: 'BrowseCtrl'
    })
        .state('searchText', {
        url: '/invitations?search',
        templateUrl: '/views/browse/list.html',
        controller: 'BrowseCtrl'
    })
        .state('templateDetails', {
        url: '/template/:id',
        templateUrl: '/views/browse/details.html',
        controller: 'TemplateCtrl'
    })
        .state('editInvitation', {
        url: '/invitation/edit/:id?template',
        templateUrl: '/views/invitation/edit/view.html',
        controller: 'EditInvitationCtrl',
        data: {
            layout: 'Empty',
        }
    })
        .state('editInvitation.details', {
        url: '/details',
        templateUrl: '/views/invitation/edit/_details.html',
        controller: 'InvitationDetailsCtrl',
    })
        .state('editInvitation.options', {
        url: '/options',
        templateUrl: '/views/invitation/edit/_options.html',
        controller: 'InvitationOptionsCtrl',
    })
        .state('editInvitation.guestList', {
        url: '/guestList',
        templateUrl: '/views/invitation/edit/_guestList.html',
        controller: 'InvitationGuestListCtrl',
    })
        .state('viewInvitation', {
        url: '/invitation/:id?guest_id&template',
        templateUrl: '/views/invitation/view/invitation.html',
        controller: 'ViewInvitationCtrl',
        data: {
            layout: 'Empty',
        }
    })
        .state('previewInvitation', {
        url: '/invitation/?template',
        templateUrl: '/views/invitation/view/invitation.html',
        controller: 'ViewInvitationCtrl',
        data: {
            layout: 'Empty',
        }
    })
        .state('otherwise', {
        url: '*path',
        templateUrl: '/views/404',
        controller: 'Error404Ctrl'
    });

//    $locationProvider.html5Mode(true);

    //  $httpProvider.interceptors.push(AuthHttpResponseInterceptor);

};

appConfig.$inject = ['$stateProvider', '$locationProvider', '$httpProvider'];

// Gets executed during the provider registrations and configuration phase. Only providers and constants can be
// injected here. This is to prevent accidental instantiation of services before they have been fully configured.
app.config(appConfig);