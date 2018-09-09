<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EventsAndRsvps extends Migration
{
    public function up()
    {
		Schema::create('warehouse_events', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('users_id');
			$table->mediumText('description');
			$table->dateTime('event_timestamp');

			$table->timestamps();
		});

		Schema::create('rsvps', function (Blueprint $table) {
			$table->increments('id');
			$table->boolean('active');
			$table->integer('users_id');
			$table->integer('warehouse_events_id');

			$table->timestamps();
		});
    }

    public function down()
    {
		Schema::dropIfExists('warehouse_events');
		Schema::dropIfExists('rsvps');
    }
}
