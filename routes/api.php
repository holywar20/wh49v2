<?php

use Illuminate\Http\Request;

/* doesn't require authentification. */
Route::post('auth/login' 			, 'Authentication@login');
Route::post('auth/new_account'		, 'Authentication@newAccount');
Route::post('auth/reset_password'	, 'Authentication@resetPassword');

Route::group(['middleware' => [ 'authenticated_access' ]] , function(){
	Route::post('auth/update_userinfo/{id}' 	, 'Authentication@updateUsername');
	Route::post('auth/update_profile/{id}' 		, 'Authentication@updateProfile');
	Route::post('auth/get_user_data/{id}'		, 'Authentication@getUserData');

	Route::post('events/getEventsByMonth/{year}/{month}'	, 'EventsController@getEvents');
	Route::post('events/getEventsByYear/{year}'				, 'EventsController@getEvents');
	Route::post('events/rvspForEvent'						, 'EventsController@newRvsp');
});

// Not sure if we need this. Using custom middleware for now.
Route::middleware('auth:api')->get('/user', function (Request $request) {

});

// TODO : wrap in admin level access check
Route::post('events/createNewEvent'						, 'EventsController@newEvent');
Route::post('events/deleteEvent'						, 'EventsController@deleteEvent');