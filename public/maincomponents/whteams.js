let teamTemplate = `
<div class="row">
	<div class="page-spacer col-sm-12"></div>

	<div class="col-lg-1"></div>
	
	<div class="col-sm-5 col-md-3 col-lg-2">
		<div class="card">
			<div class="section">
				<button class="wide-button primary">Start New Team!</button>
			</div>
			
			<div class="section">
				<div class="row center-align">
					<div class="col-sm-8 center-justify">
						<button disabled="true" class="wide-button">Team Name</button>
					</div>
					<div class="col-sm-2 center-justify">
						<span class="small-icon icono-user"></span>
					</div>
					<div class="col-sm-2 center-justify">
						<span class="small-icon icono-mail"></span>
					</div>
				</div>
				<div class="row center-align" v-for="team in teams">
					<div class="col-sm-8 center-justify">
						<button v-on:click="changeTeam( team )" class="wide-button tertiary">{{team.name}}</button>
					</div>
					<div class="col-sm-2 center-justify">
						<mark class="tag"><span class="big-mark">{{team.memberCount}}</span></mark>
					</div>
					<div class="col-sm-2 center-justify">
						<mark v-if="team.memberRequests >= 1" class="secondary tag"><span class="big-mark">{{team.memberRequests}}</span></mark>
						<mark v-if="team.memberRequests == 0" class="tertiary tag"><span class="big-mark">{{team.memberRequests}}</span></mark>
					</div>
				</div>
				
			</div>
		</div>
	</div>
	
	<div v-if="showCurrentTeam" class="col-sm-7 col-md-9 col-lg-8">
		<div class="row">
			
			<div class="col-sm-12 col-md-6 col-lg-6">
				<fieldset>
					<legend>{{ currentTeam.name }}</legend>
				
					<div class="input-group fluid">
						<label for="currentTeam.name" class="text-input-label">Team Name</label>
						<input type="text" id="currentTeam.name" v-model="currentTeam.name" placeholder="">
					</div>
					
					<div class="input-group fluid">
						<label for="biography" class="text-input-label">Biography</label>
						<textarea v-model="biography" class="standard-text-area"></textarea>
					</div>
				</fieldset>
				
				<fieldset>
					<legend>Events</legend>
					<div v-for="event in eventData" class="input-group">
						<button class="fixed-width-button">{{ event.name }}</button>
					</div>
				</fieldset>
			</div>
			
			<div class="col-sm-12 col-md-6 col-lg-6">
				<fieldset>
					<legend>Team Members</legend>
					
					<div v-for="member in currentTeam.members" class="input-group fluid">
						<label class="text-input-label">{{ member }}</label>
						<input type="email" v-model="memberTitle" placeholder="">
						<button class="primary"><span class="icono-user"></span></button>
						<button class="secondary"><span class="icono-cross"></span></button>
					</div>
				
				</fieldset>
				
				<fieldset>
					<legend>Requests</legend>
				
					<div v-for="member in membersRequested" class="input-group fluid">
						<label class="text-input-label">{{ member }}</label>
						
					</div>
				</fieldset>
				
			</div>
				
		</div>
	</div> <!-- End of show current team -->
	
	<div class="col-lg-1"></div>
</div>
`;

let teamPage = {
	template : teamTemplate,
	data : function() {
		return {
			teams: [],
			currentTeam: null,
			showCurrentTeam: 0,
			eventData: []
		}
	},
	created : function(){
		this.teams = [
			{
				'name': 'Class Warfare',
				'memberCount': 5,
				'memberRequests': 3,
				'membersRequested': [
					'test@yahoo.com', 'test2@yahoo.com', 'test3@yahoo.com'
				],
				'members': [
					'Holywar', 'Alaska Actual' , 'Sladebane' , 'The Ritual' , 'GonaHerpaSyphilAids' , 'Bullseye77'
				]
			},
			{
				'name': 'Justice',
				'memberCount' : 5 ,
				'memberRequests' : 3,
				'membersRequested': [
					'test@yahoo.com', 'test2@yahoo.com', 'test3@yahoo.com' ,'test3@yahoo.com', 'test3@yahoo.com'
				]
			},
			{
				'name': 'Murder Hobos' ,
				'memberCount' : 4 ,
				'memberRequests' : 0,
				'membersRequested': [
					'test@yahoo.com', 'test2@yahoo.com', 'test3@yahoo.com' ,'test3@yahoo.com'
				]
			},
			{
				'name': 'Misunderestimated',
				'memberCount': 2,
				'memberRequests': 0,
				'membersRequested': [
					'test@yahoo.com', 'test2@yahoo.com'
				]
			}
		]; // End of Array of Object - TODO should be retreived

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
				}
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
	methods : {
		changeTeam : function( teamObject ){

			this.currentTeam = teamObject;
			this.showCurrentTeam = 1;
		}
	}
};

Vue.component('whteams', teamPage);