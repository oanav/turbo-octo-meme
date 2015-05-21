/// <reference path="../typings/angularjs/angular.d.ts"/>
'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps',
    'app.filters', 'app.services', 'app.directives',
    'app.main', 'app.invitation', 'app.user', 'app.modals',
    'ngToast', 'ngAnimate', 'ngSanitize', 'djds4rce.angular-socialshare' 
    ])

// Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
// can be injected here. This is to prevent further system configuration during application run time.
    .run(['$templateCache', '$rootScope', '$state', '$stateParams',
    function ($templateCache, $rootScope, $state, $stateParams) {

        // <ui-view> contains a pre-rendered template for the current view
        // caching it will prevent a round-trip to a server at the first page load
        var view = angular.element('#ui-view');
        $templateCache.put(view.data('tmpl-url'), view.html());
 
        // Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.pages = {
            MAIN: 'Main',
            INVITATION_EDIT: 'Edit Invitation',
            INVITATION_VIEW: 'Invitation'
        };

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
            $rootScope.page = $rootScope.pages.MAIN;
            if (toState.data) {
                $rootScope.page = toState.data.page;
        
                var requireLogin = toState.data.requireLogin;
        
                if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                  event.preventDefault();
                  //loginModal()
                  //  .then(function () {
                  //      return $state.go(toState.name, toParams);
                  //  });
                }
            }
        });
    }]);

app.services = angular.module('app.services', []);
app.directives = angular.module('app.directives', []);
app.filters = angular.module('app.filters', []); 
