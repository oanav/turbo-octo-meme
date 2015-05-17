app.config(function ($stateProvider) {
	    
	// UI States, URL Routing & Mapping. 
	// https://github.com/angular-ui/ui-router

    $stateProvider
        .state('main', {
        templateUrl: '/modules/main/views/main.html',
        controller: 'MainCtrl'
    })
    .state('main.home', {
        url: '/',
        templateUrl: '/modules/main/views/home.html',
        controller: 'MainCtrl'
    })
        .state('login', {
        url: '/account/login',
        templateUrl: '/modules/auth/views/login.html',
        controller: 'LoginCtrl'
    })
        .state('main.browse', {
        url: '/invitations/:category/:subcategory',
        templateUrl: '/modules/main/views/templateList.html',
        controller: 'SearchCtrl'
    })
        .state('main.search', {
        url: '/invitations?searchText',
        templateUrl: '/modules/main/views/templateList.html',
        controller: 'SearchCtrl'
    })
        .state('main.templateDetails', {
        url: '/template/:id',
        templateUrl: '/modules/main/views/templateDetails.html',
        controller: 'TemplateCtrl'
    })
        .state('editInvitation', {
        url: '/invitation/edit/:id?template',
        templateUrl: '/modules/invitation/edit/views/invitation.html',
        controller: 'EditInvitationCtrl',
        data: {
            page: 'INVITATION_EDIT',
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
        url: '/invitation/:id?guest_id',
        templateUrl: '/modules/invitation/view/views/invitation.html',
        controller: 'ViewInvitationCtrl',
        data: {
            page: 'INVITATION_VIEW',
        }
    })
        .state('previewInvitation', {
        url: '/invitation/preview/?template',
        templateUrl: '/modules/invitation/view/views/invitation.html',
        controller: 'ViewInvitationCtrl',
        data: {
            page: 'INVITATION_VIEW',
        }
    })
        .state('otherwise', {
        url: '*path',
        templateUrl: '/404.html',
    });
});