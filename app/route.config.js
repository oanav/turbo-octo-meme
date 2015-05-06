app.config(function ($stateProvider) {
	    
	// UI States, URL Routing & Mapping. 
	// https://github.com/angular-ui/ui-router

    $stateProvider
        .state('home', {
        url: '/',
        templateUrl: '/modules/main/views/home.html',
        controller: 'HomeCtrl'
    })
        .state('login', {
        url: '/account/login',
        templateUrl: '/modules/auth/views/login.html',
        controller: 'LoginCtrl'
    })
        .state('browseCategory', {
        url: '/invitations/:category/:subcategory',
        templateUrl: '/modules/templates/views/templateList.html',
        controller: 'SearchCtrl'
    })
        .state('searchText', {
        url: '/invitations?search',
        templateUrl: '/modules/templates/views/templateList.html',
        controller: 'SearchCtrl'
    })
        .state('templateDetails', {
        url: '/template/:id',
        templateUrl: '/modules/templates/views/templateDetails.html',
        controller: 'TemplateCtrl'
    })
        .state('editInvitation', {
        url: '/invitation/edit/:id?template',
        templateUrl: '/modules/invitation/edit/views/invitation.html',
        controller: 'EditInvitationCtrl',
        data: {
            layout: 'Empty',
        }
    })
        .state('editInvitation.details', {
        url: '/details',
        templateUrl: '/modules/invitation/edit/views/details.html',
        controller: 'InvitationDetailsCtrl',
    })
        .state('editInvitation.options', {
        url: '/options',
        templateUrl: '/modules/invitation/edit/views/options.html',
        controller: 'InvitationOptionsCtrl',
    })
        .state('editInvitation.guestList', {
        url: '/guestList',
        templateUrl: '/modules/invitation/edit/views/guestList.html',
        controller: 'InvitationGuestListCtrl',
    })
        .state('viewInvitation', {
        url: '/invitation/:id?guest_id&template',
        templateUrl: '/modules/invitation/view/views/invitation.html',
        controller: 'ViewInvitationCtrl',
        data: {
            layout: 'Empty',
        }
    })
        .state('previewInvitation', {
        url: '/invitation/?template',
        templateUrl: '/modules/invitation/view/views/invitation.html',
        controller: 'ViewInvitationCtrl',
        data: {
            layout: 'Empty',
        }
    })
        .state('otherwise', {
        url: '*path',
        templateUrl: '/404.html',
    });
});