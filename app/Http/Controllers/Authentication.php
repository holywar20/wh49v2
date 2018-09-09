<?php

namespace App\Http\Controllers;

/* modals */
use App\Users;

use App\Providers\JWT;
use Illuminate\Http\Request;

use Validator;
use Log;

class Authentication extends Controller
{
	const ENCRYPTION_ALGO = PASSWORD_BCRYPT;
	const ENCRYPTION_COST = 12;

	const INVALID_USERPASS_ERROR = "Either your username or password was invalid.";

	const MESSAGE_UPDATE_USERNAME_SUCCESS 	= "User info successfully updated.";
	const MESSAGE_UPDATE_PROFILE_SUCCESS	= "Profile updated.";
	const MESSAGE_UPDATE_PASSWORD_SUCCESS	= "Password updated.";

	const MESSAGE_UPDATE_USERNAME_FAIL		= "This email already exists or is invalid"; // Validation can't hanlde this. Wrote a custom message for it.

	const MESSAGE_UPDATE_BADID		= "Can't find this user in the system. Please relogin in and try again";

	/* Validation strings, used by the Validator class */
	const VALIDATION_EMAIL_CHANGE 	= "required|max:100|email";
	const VALIDATION_EMAIL 			= "required|unique:users|max:100|email";

	const VALIDATION_HANDLE 		= "required|min:4";
	const VALIDATION_PASSWORD		= "required|min:8";

	const VALIDATION_FIRST_NAME		= "required_with:last_name|nullable";
	const VALIDATION_LAST_NAME		= "required_with:first_name|nullable";
	const VALIDATION_LINK			= 'sometimes|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|nullable';

	public $request = null;
	public $JWT = null;

	public function __construct( Request $request , JWT $JWT ){
		$this->request = $request;
		$this->JWT = $JWT;
	}

	public function login(){

		$username = $this->request->username;
		$password = $this->request->password;
		$errors = array();

		$user = Users::where('email' , $username )->first();

		if( $user ) {
			if( !password_verify( $user->salt.$password , $user->password ) ) {
				$errors['userpass'] = self::INVALID_USERPASS_ERROR;
			}
		}  else {
			$errors['userpass'] = self::INVALID_USERPASS_ERROR;
		}

		if( count($errors )>= 1 ){
			return parent::sendErrors( $errors );
		} else {
			$token = $this->JWT->create( $user->id );

			return array(
				'token' 	=> $token,
				'access' 	=> $user->access,
				'id'		=> $user->id
			);
		}
	}

	private function verifyPassword($password, $id){

        $errors = array();

        $user = Users::find($id);

        if( $user ) {
            if( !password_verify( $user->salt.$password , $user->password ) ) {
                $errors['userpass'] = self::INVALID_USERPASS_ERROR;
            }
        }  else {
            $errors['userpass'] = self::INVALID_USERPASS_ERROR;
        }

        if( count($errors )>= 1 ){
            return  $errors;
        } else {

            return true;
        }
    }

	public function getUserData( $id ){
		$user = Users::find($id);
		return $user;
	}

	public function newPassword(){

		return $this->request->all();
	}

	public function updateProfile( $id ){

		$allData = $this->request->all();
		$validator = Validator::make( $allData, [
			'first_name' 	=> self::VALIDATION_FIRST_NAME,
			'last_name'		=> self::VALIDATION_LAST_NAME,
			'twitter'		=> self::VALIDATION_LINK,
			'facebook'		=> self::VALIDATION_LINK,
		]);
		if( $validator->fails() ){
			return parent::sendMessages( $validator->errors() );
		}

		$messages = array();
		$user = Users::find($id);

		if( $user ){
			$user->first_name 	= $allData['first_name'];
			$user->last_name	= $allData['last_name'];
			$user->twitter		= $allData['twitter'];
			$user->facebook		= $allData['facebook'];
			$user->biography	= $allData['biography'];
			$user->twitch		= $allData['twitch'];

			$user->save();

			$messages['user'][] = self::MESSAGE_UPDATE_PROFILE_SUCCESS;
		} else {
			$messages['user'][] = self::MESSAGE_UPDATE_BADID;
		}

		return parent::sendMessages( $messages );
	}

	public function updateUsername($id){

		$allData = $this->request->all();
		$validator = Validator::make( $allData, [
			'email' 	=> self::VALIDATION_EMAIL_CHANGE,
			'handle'	=> self::VALIDATION_HANDLE
		]);

		if( $validator->fails() ){
			return parent::sendMessages( $validator->errors() );
		}

		$isValidForWriting = true;
		$messages = array();

		$emailCheckUser = Users::where( [
							['email' , "="		, $allData['email']],
							['id'	 , "!=" 	, $id]
						] )
						->first();

		if( $emailCheckUser ){
			$messages['email'][] = self::MESSAGE_UPDATE_USERNAME_FAIL;
			$isValidForWriting = false;
		}

		if( $isValidForWriting ){
			$myUser = Users::find($id);

			Log::debug($myUser);

			if($myUser){

				$myUser->email = $allData['email'];
				$myUser->handle = $allData['handle'];
				$myUser->save();

			} else {
				$messages['email'][] = self::MESSAGE_UPDATE_BADID;
			}
		}

		if( count( $messages ) < 1){
			$messages['email'][] = self::MESSAGE_UPDATE_USERNAME_SUCCESS;
		}

		return parent::sendMessages( $messages );
	}

	public function updatePassword($id){
        $allData = $this->request->all();
        $messages = array();
        $verifyResult = $this->verifyPassword($allData['current'], $id);

        if($verifyResult === true) {

            $validator = Validator::make($allData, [
                'new' => self::VALIDATION_PASSWORD
            ]);

            if ($validator->fails()) {
                return parent::sendMessages($validator->errors());
            }

            $myUser = Users::find($id);
            Log::debug($myUser);
            Log::debug(get_class($myUser));


            if ($myUser) {
                $myUser->password = $this->encrypt($myUser->salt . $allData['new']);
                $myUser->save();
                $messages['password'][] = self::MESSAGE_UPDATE_PASSWORD_SUCCESS;

            } else {
                $messages['password'][] = self::MESSAGE_UPDATE_BADID;
            }
        }
        else
        {
            $messages = $verifyResult;
        }
        Log::debug($allData);
    return parent::sendMessages( $messages );
    }

	public function newInvitedAccount(){

	}

	public function newAccount(){

		$validator = Validator::make( $this->request->all(), [
			'email' 	=> self::VALIDATION_EMAIL		,
			'password' 	=> self::VALIDATION_PASSWORD 	,
			'handle'	=> self::VALIDATION_HANDLE
			// TODO - add additional password validations
		]);

		if( $validator->fails() ){
			return parent::sendMessages( $validator->errors() );
		} else {
			$userdata = $this->request->all();
		}

		$user = new Users;
		$user->fill( $userdata );

		$user->access	= Users::ACCESS_USER;
		$user->salt 	= uniqid();

		$user->password = $this->encrypt( $user->salt . $userdata['password'] );
		$user->save();

		$token = $this->JWT->create( $user->id );

		return array(
			'token' => $token
		);
	}

	private function encrypt( $stringToEncrypt ){
		return password_hash( $stringToEncrypt , self::ENCRYPTION_ALGO ,
			array( 'cost' => self::ENCRYPTION_COST )
		);
	}

}
