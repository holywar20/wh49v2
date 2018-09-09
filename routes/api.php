<?php

use Illuminate\Http\Request;


/* doesn't require authentification. */
Route::post('auth/login' 			, 'Authentication@login');
Route::post('auth/new_account'		, 'Authentication@newAccount');
Route::post('auth/reset_password'	, 'Authentication@resetPassword');

Route::group(['middleware' => [ 'authenticated_access' ]] , function(){
	Route::post('auth/update_usericd nfo/{id}' 	, 'Authentication@updateUsername');
	Route::post('auth/update_profile/{id}' 		, 'Authentication@updateProfile');
	Route::post('auth/get_user_data/{id}'		, 'Authentication@getUserData');

});

Route::middleware('auth:api')->get('/user', function (Request $request) {

});