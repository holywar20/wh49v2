/* Bootstrap all my services , order here is VERY IMPORTANT

        Also note, that ALL globals are being placed here. Javascript isn't clean
    with globals. Putting them all here and no where else as a convention will prevent
    globals from creeping all over the place, and give everything an explicit definition.
*/

// Global objects - these are singletons meant to handle various things. Treat these like services.
let Config		 = GLOBALCONFIG();													// Loads all our truely global Variables.
let VmEventBus   = GlobalGenerateEventBus( EVENTS );								// Generates a generic event bus object, meant to be used everywhere.
let VmDataSender = GlobalGenerateDataSender( Config.BASEURL , Config.DEBUGMODE );	// DataSender, which handles all of the API requests.
let Cookies      = GlobalCookies();													// A Simple cookie manager
// Library initialization & config

let Moment = moment; // Creating new refrence since the moment library is meant to be global, and we captalize global objects in these parts ...
Moment.locale();

/* State is the master vue object. This should, by convention track which modals/pages should be showing, in addition to serving as data storage. */
let STATE = null;
window.onload = function(){

STATE = new Vue({
	el : '#main-container',
	data : function() {
		return {
			ID: null,
			access: null,
			showView: PAGES.WHLOGIN,
			loggedIn: 0
		};
	},
	methods : {
		logout : function(){
			STATE.logoutUser();
		},
		gotoPage : function( page ){
			STATE.changeView( page , "Main navigation link clicked" );
		},
	},
	created : function(){
		//
	}
});

	// Global Methods - Anything can call these
	STATE.changeView = function( page , reason  ){

		if( PAGES[page] ){
			console.log( "Changing View to " + page + " because : " + reason );
			STATE.showView = page;
		} else {
			console.log(" Page : '"+ page + "' Can't be found. Doing nothing. Reason string is :" + reason )
		}
	};

	STATE.loginUser = function( token, access, id){
		STATE.access = access;
		STATE.token = token;
		STATE.ID = id;

		Cookies.eraseCookie(  'token' );
		Cookies.createCookie( 'token' , token, 1 ); // JWT should be valid for 1 day.

		Cookies.eraseCookie( 'access');
		Cookies.createCookie('access', access, 1);

		Cookies.eraseCookie( 'id');
		Cookies.createCookie('id', id, 1);

	};

	STATE.logoutUser = function(){
		VmEventBus.emit( EVENTS.LOGOUT );
	};

	// STATE events
	STATE.onLogin = function( token, access, id ){

		if( token && access && id ){
			STATE.loginUser( token , access, id );
			STATE.changeView( PAGES.WHEVENTS , "User " + STATE.ID + " logged in!" )
		} else {
			console.log("Debug: login was attempted but failed. May want to look into that.");
		}
	};

	STATE.onLogout = function(){
		STATE.access = null;
		STATE.ID = null;
		STATE.token = null;

		Cookies.eraseCookie('token');
		Cookies.eraseCookie('access');
		Cookies.eraseCookie('id');

		STATE.changeView( PAGES.WHLOGIN , "User " + STATE.ID + " logged out" );
	};

	STATE.checkForLogin = function(){

		let token 	= Cookies.readCookie('token');
		let access	= Cookies.readCookie('access');
		let id		= Cookies.readCookie('id');

		if( token && access && id ){
			STATE.loginUser( token , access, id );
			STATE.changeView( PAGES.WHEVENTS , "User " + id + " logged in!" )
		}
	};

	STATE.getID = function(){
		return STATE.ID;
	};

	STATE.getACCESS = function(){
		return STATE.access;
	};

	/* Set some one time initialization. We want these to run exactly once.  */
	STATE.checkForLogin();
	VmEventBus.notify( EVENTS.LOGIN_SUCCESS , 'STATEObject' , STATE.onLogin , [ 'token', 'access', 'id' ] );
	VmEventBus.notify( EVENTS.LOGOUT 		, 'STATEObject' , STATE.onLogout );
}; // End of window.onload()

