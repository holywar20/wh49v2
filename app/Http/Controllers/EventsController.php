<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EventsController extends Controller
{
	protected $request;

	public function __construct( Request $request ){
		$this->request = $request;
	}

	public function getEvents( $month, $year ){

		return array(
			'startTest' 	=> $month,
			'endTest'		=> $year
		);
	}

	public function newEvent(){
		return $this->request->all();
	}

	public function updateEvent(){
		return $this->request->all();
	}

	public function newRSVP(){
		return $this->request->all();
	}

	public function deleteRSVP(){
		return $this->request->all();
	}
}
