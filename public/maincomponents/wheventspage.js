let eventsPageTemplate = `
<div class="container">
<div class="page-specific-controls row center-align">
	<div class="page-spacer col-sm-12"></div>

	<div class="col-sm col-md col-lg-1"></div> 
	
	<div v-if=" viewType == 'calender' " class="calender-buttons center-align col-sm-12 col-md-12 col-lg-10">
		<div class="justify">
			<div>
				<button v-on:click="changeViewType" class="primary">
					Calender&nbsp;<span class="icono-hamburger"></span>
				</button>
			</div>
			
			<div class="center-align">
				<button class="primary"><i class="icono-rewind"></i></button>
					<h3><mark>April</mark></h3>
				<button class="primary"><i class="icono-forward"></i></button>
			</div>
		</div>
	</div>
	
	<div v-if="viewType == 'list'" class="center-align col-sm-12 col-md-12 col-lg-10">
		<div class="justify">
			<div>
				<button v-on:click="changeViewType" class="primary">
				List&nbsp;<span class="icono-calendar"></span>
				</button>
			</div>
			
			<div v-if="userAccess=='admin'">
				<button v-on:click="callEventModal" class="primary">Add New Event</button>
			</div>
			
			<div v-if="">
				
			</div>
		</div>
		
	</div>
	
	<div v-if="">
		<div>
		
		</div>
	</div>
	
	<div class="col-sm col-md col-lg-1"></div> 
</div>
	
<div class="row">
	<div class="col-sm col-md col-lg-1"></div> <!-- Spacer -->
	
	<div  v-if="viewType=='list'" class="col-sm-12 col-md-12 col-lg-10 row">
		<div v-for="event in eventData">
			<div class="card header-card">
				<div class="space-between">
					<div>
						<h3>{{event.name}}</h3>
						<b>Date : </b>{{event.timedisplay}}
					</div>
					
					<div class="small-icon-container">
						<button v-on:click class="primary">
							<span class="icono-rename"></span>
						</button>
						
						<button v-if="userAccess=='admin'" class="secondary">
							<span class="icono-crossCircle"></span>
						</button>
					</div>
				</div>
			</div>
			
			<div class="card description-card">
				{{event.description}}
			</div>
		</div>
	</div>

	<div v-if="viewType=='calender' " class="col-sm-12 col-md-12 col-lg-10">
	
		<div class="calender-header row">
			<div class="calender-day-name">Monday</div>
			<div class="calender-day-name">Tuesday</div>
			<div class="calender-day-name">Wednesday</div>
			<div class="calender-day-name">Thursday</div>
			<div class="calender-day-name">Friday</div>
			<div class="calender-day-name">Saturday</div>
			<div class="calender-day-name">Sunday</div>
		</div>
	
		<div class="calender-week row">
			<div class="calender-day">1</div>
			<div class="calender-day">2</div>
			<div class="calender-day current-day">3</div>
			<div class="calender-day">4</div>
			<div class="calender-day">5</div>
			<div class="calender-day">6</div>
			<div class="calender-day">7</div>
		</div>
		
		<div class="calender-week row">
			<div class="calender-day">1</div>
			<div class="calender-day">2</div>
			<div class="calender-day">3</div>
			<div class="calender-day">4</div>
			<div class="calender-day">5</div>
			<div class="calender-day">6</div>
			<div class="calender-day">7</div>
		</div>
		
		<div class="calender-week row">
			<div class="calender-day">1</div>
			<div class="calender-day">2</div>
			<div class="calender-day">3</div>
			<div class="calender-day">4</div>
			<div class="calender-day">5</div>
			<div class="calender-day">6</div>
			<div class="calender-day">7</div>
		</div>
		
		<div class="calender-week row">
			<div class="calender-day">1</div>
			<div class="calender-day">2</div>
			<div class="calender-day">3</div>
			<div class="calender-day">4</div>
			<div class="calender-day">5</div>
			<div class="calender-day">6</div>
			<div class="calender-day">7</div>
		</div>
		
		<div class="calender-week row">
			<div class="calender-day">1</div>
			<div class="calender-day">2</div>
			<div class="calender-day">3</div>
			<div class="calender-day">4</div>
			<div class="calender-day">5</div>
			<div class="calender-day">6</div>
			<div class="calender-day">7</div>
		</div>
	</div>
	
	<div class="col-sm col-md col-lg-1"></div> 
</div>
</div> <!-- end of container -->
`;

let userEventsPageObject = {
	template: eventsPageTemplate,
	data: function () {
		return {
			viewType   		: 	'list',
			eventData		: 	[],
			calenderMonth	:	[],
			showEventModal 	: 	0,

			userAccess : null
		}
	},
	created: function () {

		this.userAccess = STATE.getACCESS();


		// TODO - get current event data
		this.eventData = [
			{
				'name': 'test event',
				'description': 'bunch of description for the event',
				'starttime': 1527987810,
				'endtime': 1527987810,
				'timedisplay': "June 11th, 2018, 7pm-9pm",
				'links' : {
					'facebook' : 'www.facebook.com',
					'twitter'  : 'www.twitter.com',
				},
				'id' : 1
			},
			{
				'name': 'test event 2',
				'description': 'bunch of description for the event',
				'starttime': 1527987810,
				'endtime': 1527987810,
				'timedisplay': "June 11th, 2018, 7pm-9pm"
			},
			{
				'name': 'test event 3',
				'description': 'bunch of description for the event',
				'starttime': 1527987810,
				'endtime': 1527987810,
				'timedisplay': "June 11th, 2018, 7pm-9pm"
			},
			{
				'name': 'test event 3',
				'description': 'bunch of description for the event',
				'starttime': 1527987810,
				'endtime': 1527987810,
				'timedisplay': "June 11th, 2018, 7pm-9pm"
			},
			{
				'name': 'test event 3',
				'description': 'bunch of description for the event',
				'starttime': 1527987810,
				'endtime': 1527987810,
				'timedisplay': "June 11th, 2018, 7pm-9pm"
			},
		]
	},
	methods: {
		changeViewType: function () {
			if ( this.viewType === "list" )
				this.viewType = "calender";
			else
				this.viewType = "list";
		},
		callEventModal: function( id = false){

			this.showEventModal = 1;

			if( !id ){
				// New event
			}

			if( id ){

			}
		},
		closeEventModal: function() {
			this.showEventModal = 0;
		},
		deleteEvent : function( eventKey ){
			console.log("deleting an event");
		},
		editEvent: function( eventKey ){
			console.log("editing an already existing event")
		}
	}
}// End of Vue component

Vue.component('wheventspage', userEventsPageObject);

