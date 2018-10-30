var GlobalGenerateDataSender = function( baseUrl ){

	var headers = {
		'accept': 'application/json',
		'accept-language': 'en_US',
	}

	const ADD_TOKEN 	= true;
	const NO_TOKEN 		= false;

	this.example = {}; // Just a way to organize requests types to make it more managable.
	this.example.doAThing = function( data, urlParam, urlParam2 ){
		let urlFragment = "example/doAThing/" + urlParam + "/" + urlParam2  // Serverside route
		return postData( data, urlFragment , EVENTS.LOGIN_SUCCESS , NO_TOKEN )
		/* NOTE : the event is the event you want fired AFTER data returns.
		           Anything the server creates will should be availble in an event bus Databucket which a callback can then look for. */
	};

	this.auth = {};
	this.auth.login = function( data ){
		let urlFragment = "auth/login";
		return postData( data, urlFragment , null , NO_TOKEN )
	};
	this.auth.passwordReset = function( data ){
		let urlFragment = "auth/reset_password";
		return postData( data, urlFragment )
	};
	this.auth.newAccount = function(data){
		let urlFragment = "auth/new_account";
		return postData( data, urlFragment , EVENTS.ACCOUNT_CREATION_REQUEST , NO_TOKEN )
	};
	this.auth.updateProfile = function(data , id){
		let urlFragment = "auth/update_profile/" + id;
		return postData( data, urlFragment )
	};
	this.auth.updatePassword = function( data , id ){
		let urlFragment = "auth/update_password/" + id;
		return postData( data, urlFragment );
	};
	this.auth.updateUserName = function(data , id ){
		let urlFragment = "auth/update_userinfo/" + id;
		return postData( data, urlFragment );
	};
	this.auth.getUserData = function( id ){
		let urlFragment = "auth/get_user_data/" + id;
		data = {};

		return postData( data, urlFragment )
	};

	this.admin = {};
	this.admin.indexUser = function(){

	};
	this.admin.indexEvents = function(){

	};

	this.events = {};
	this.events.getEventsByMonth = function( month , year){
		let urlFragment = "events/getEventsByMonth/" + year + "/" + month;
		data = {};

		return postData( data, urlFragment );
	}
	this.events.getEventsByYear = function( year ){
		let urlFragment = "events/getEventsByMonth/" + year;
		data = {};

		return postData( data, urlFragment );
	}

	var postData = function(data, urlFragment, event = null ,  needsToken = ADD_TOKEN ){

		var myUrl = baseUrl + urlFragment;

		if( needsToken === ADD_TOKEN ){
			data.token = Cookies.readCookie('token');
			if( !data.token ){
				STATE.changeView( PAGES.WHLOGIN, "Token is missing. Sending back to login page to get new one.");
			}
		}
		console.log('Datasender is sending POST to  :' + myUrl );
		console.log(data);

		return fetch( myUrl, {
			method : "POST",
			headers : {
				"Content-Type" : "application/json; charset=utf-8"
			},
			body : JSON.stringify(data)
		})
		.then(function( response ) { // TODO : More robust/smart error checking
			console.log( response );
			if( response.status !== 200 ){
				return errorCodeHandler( response.status , response );
			} else {
				return response.json()
			}

		})
		.then( function( myJson ) {
			console.log( myJson );

			if( event && myJson ){
				VmEventBus.setEventData( event, myJson );
				VmEventBus.emit( event );
			}

			return myJson
		})
		.catch(function( errors ) {
			return errors;
		});
	};

	var errorCodeHandler = function(code , response ){

		var statusCode = "Status Code: " + code;
		var json = response.json();
		console.log("Server rejected the request: " + statusCode );

		if( code === 403 ) {
			// STATE.changeView( PAGES.WHLOGIN , reason);
		}

		console.log("server error: code - " + code);
		// STATE.changeView( PAGES.WHLOGIN , 'Default server error');

		return json;
	};

	return this;
};
