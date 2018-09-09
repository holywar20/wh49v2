let GLOBALCONFIG = function(){

	this.BOXSET = "DEV";

	this.DEBUGMODE = false;
	this.BASEURL = "http://laravel.localdev/wh48/public/api/";

	return this;
};

// This where I'm placing my 'Constants'. Not real constants, but should be treated semantically as constants.
EVENTS = {
	'TEST_EVENT'				: 'TEST_EVENT',

	'LOGIN_ATTEMPT'				: 'LOGIN_ATTEMPT',
	'LOGIN_SUCCESS'  			: 'LOGIN_SUCCESS',
	'LOGOUT' 					: 'LOGOUT',

	'ACCOUNT_CREATION_REQUEST' 	: 'ACCOUNT_CREATION_REQUEST',
	'ACCOUNT_CREATION_SUCCESS' 	: 'ACCOUNT_CREATION_SUCCESS'
};

PAGES = {
	// Pre Authorization
	'WHLOGIN'			: 'WHLOGIN' ,
	'WHNEWACCOUNT'		: 'WHNEWACCOUNT',
	'WHFORGOTPASSWORD'	: 'WHFORGOTPASSWORD',

	// User Authorized
	'WHEVENTS'		: 'WHEVENTS',
	'WHPROFILE'		: 'WHPROFILE',
	'WHTEAMS'		: 'WHTEAMS'

	// Admin Authorized
};