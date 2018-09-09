<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WarehouseEvents extends Model
{
	protected $table = 'warehouse_events';

	protected $fillable = [
		'description', 'event_timestamp'
	];

	protected $hidden = [

	];
}
