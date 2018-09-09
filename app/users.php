<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
	const ACCESS_INVITED	= "Invited";
	const ACCESS_USER		= "User";
	const ACCESS_ADMIN		= "Admin";

	protected $table = 'users';

	protected $fillable = [
		'first_name', 'last_name', 'email'	 , 'notify_user' , 'handle',
		'biography',  'facebook' , 'twitter' , 'twitch'
	];

	protected $hidden = [
		'password', 'salt'
	];
}
