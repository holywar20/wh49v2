<?php

namespace App\Providers;

/* Models */
use App\Users;

/* Classes/services */
use Log;

class JWT{

	const SITE_NAME = 'Warehouse49.com';

	private $validUserAccess = array(
		Users::ACCESS_USER, Users::ACCESS_ADMIN
	);

	private $myKey = "10";
	private $token = null;

	public function __construct( $tokenString = null ){
		$this->token = $tokenString;
		//$this->myKey = env('JWT_TOKEN_KEY' , false); // Key is stored in .env on the root.
	}

	public function makeNewKey(){
		// TODO : make a new key automatically every day or so.
	}

	public function create($id){
		/* Refrence - http://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs */
		$header = array(
			"alg" => "sha512",
			"typ" => "JWT"
		);

		$payload = array(
			"iss"  => self::SITE_NAME,
			"exp"  => time() + ( 3600 * 6 ),  // Token expires in day.
			"id"   => $id
		);

		$encodedPayload = base64_encode(json_encode($payload));
		$encodedHeader = base64_encode(json_encode($header));

		$content = $encodedHeader.".".$encodedPayload;

		$signature = hash_hmac('sha512', $content , $this->myKey );

		$jwt = "{$encodedHeader}.{$encodedPayload}.{$signature}";
		$this->token = $jwt;

		return $jwt;
	}

	public function loadToken( $token ){
		$this->token = $token;
	}

	public function extractOneClaim( $tokenParam ){
		list( $header, $payload, $sig ) = explode('.', $this->token);// Only payload is needed here, which should be center item in JWT

		$payload = json_decode(base64_decode($payload));
		$payload = (array)$payload;

		return $payload[$tokenParam];
	}

	public function validate()
	{
		$isValid = true;

		if ( $this->token ) {

			list($header, $payload, $sig) = explode('.', $this->token);
			$content = $header . "." . $payload;

			if (!hash_hmac('sha512', $content, ($this->myKey)) == $sig) // Validate signature
				$isValid = false;

			$iss = $this->extractOneClaim('iss');			 // Verify site name
			if ( $iss != self::SITE_NAME )
				$isValid = false;

			$exp = $this->extractOneClaim('exp');			// Verify that token isn't expired.
			if ( $exp <= time() )
				$isValid = false;

			$id = intval($this->extractOneClaim('id'));		// Verify token has an ID number
			if ( !$id )
				$isValid = false;

			if( $id ) {

				$user = Users::find($id);					// Verify that user is actually permitted to access system.
				if( $user ){
					if( in_array( $user->access , $this->validUserAccess ) ){
						// Do nothing. User is valid
					} else {
						$isValid = false;
					}
				} else {
					$isValid = false;
				}
			}

		} else {
			$isValid = false;
		}

		return $isValid;
	}
}


