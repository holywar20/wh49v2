<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
	public function up(){

		Schema::create('users', function (Blueprint $table) {
			$table->increments('id');
			$table->string('email', 100)->unique();

			$table->string('handle'		, 100);
			$table->string('access'		, 100);

			$table->string('password', 100);
			$table->string('salt', 100);

			$table->mediumText('biography')->nullable();
			$table->string('twitch'		, 100)->nullable();
			$table->string('facebook'	, 100)->nullable();
			$table->string('twitter'	, 100)->nullable();

			$table->string('last_name'	, 100)->nullable();
			$table->string('first_name'	, 100)->nullable();

			$table->boolean('notify_user');
			$table->timestamps();
		});
	}

	public function down(){
		Schema::dropIfExists('users');
	}
}
