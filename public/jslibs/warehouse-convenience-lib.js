/* This is meant for random methods that make life easy.

Please document these if you want to add to it.

Syntax is a bit odd. This is an IIFE ( Immediately invoked function expression. ).
it's designed to protect the global namespace.

This is a singleton, as it's mostly meant for helper methods. IF you need a new method to be globally available
that is not dependent upon local data, put it here.

 */

let WarehouseLib = ( function(){

	let foreach = function( object, callback ){

		for( const prop in object ){
			if( object.hasOwnProperty( prop ) ){
				callback( prop );
			}
		}
	};

	let validateEmail = function( emailToValidate ){
		let emailValidationString = "/\S+@\S+\.\S+/";
		return emailValidationString.test( emailToValidate );
	};

	// Generates a non-cryptographically secure key.
	let generateRandomKey = function(){
		return Math.random().toString(30);
	};

	/* this is the public interface for this IIFE. think of this your API for public methods */
	return {
		foreach 			: foreach,
		generateRandomKey	: generateRandomKey,
		validateEmail		: validateEmail
	}
})();