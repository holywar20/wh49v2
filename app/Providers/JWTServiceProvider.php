<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// use App\Providers\JWT;

class JWTServiceProvider extends ServiceProvider
{
	public function register(){
		$this->app->bind('App\Providers\JWT', function(){
			return new JWT();
		});
	}
}
