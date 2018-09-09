<?php

namespace App\Http\Middleware;

use App\Providers\JWT;
use Closure;

use Log;

class JWTValidate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
	public function handle($request, Closure $next){

		$all = $request->json()->all();

		if( isset($all['token']) ){
			$JWTString = $all['token'];
		} else {
			$JWTString = "";
		}

		$JWT = new JWT( $JWTString );
		$isValid = false;

		if( $JWT->validate() ){
			$isValid = true;
		}

		if( $isValid )
			return $next( $request );
		else
			return response( ['token'=> false], 403);
	}
}
