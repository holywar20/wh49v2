let profileTemplate = `
<div class="row">
	<div class="page-spacer col-sm-12"></div>

	<div class="col-sm col-md-2 col-lg-3"></div>

	<div class="col-sm-12 col-md-4 col-lg-3">
		<fieldset>
			<legend>{{ user_form.email }}</legend>
			<div class="input-group fluid">
				<label for="username" class="text-input-label">Username</label>
				<input type="email" v-model="user_form.email" id="email" placeholder="Valid@email.com">
			</div>
			
			<div class="input-group fluid">
				<label for="handle" class="text-input-label">Handle</label>
				<input type="text" v-model="user_form.handle" id="handle" placeholder="Badass">
			</div>
			
			<div class="center-justify">
				<button v-on:click="sendUsername()" class="wide-button tertiary">Change Username / Handle</button>
			</div>
			
			<div class="message-container" v-for="message_array in messages.user_form">
				<mark v-for="message in message_array">{{ message }}</mark>
			</div>
			<hr>
			
			<legend>Change Password</legend>
			<div class="input-group fluid">
				<label for="handle" class="text-input-label">Current</label>
				<input type="password" v-model="password_form.current">
			</div>
			
			<div class="input-group fluid">
				<label for="handle" class="text-input-label">New</label>
				<input type="password" v-model="password_form.new">
			</div>
			
			<div class="input-group fluid">
				<label for="handle" class="text-input-label">Verify</label>
				<input type="password" v-model="password_form.verify">
			</div>
			
			<div class="center-justify">
				<button class="wide-button secondary">Save Password</button>
			</div>
		</fieldset>
	</div>
	
	<div class="col-sm-12 col-md-4 col-lg-3">
		<fieldset>
		<legend>{{ user_form.handle }}'s Profile</legend>
			<div class="input-group fluid">
				<label class="text-input-label">First Name</label>
				<input type="text" v-model="profile_form.first_name" placeholder="">
			</div>
			
			<div class="input-group fluid">
				<label class="text-input-label">Last Name</label>
				<input type="text" v-model="profile_form.last_name" placeholder="">
			</div>
			
			<div class="input-group fluid">
				<label class="text-input-label">Facebook</label>
				<input type="email" v-model="profile_form.facebook" placeholder="">
			</div>
			
			<div class="input-group fluid">
				<label class="text-input-label">Twitter</label>
				<input type="email" v-model="profile_form.twitter" placeholder="">
			</div>
			
			<div class="input-group fluid">
				<label class="text-input-label">Twitch</label>
				<input type="email" v-model="profile_form.twitch" placeholder="">
			</div>
			
			<div class="input-group fluid">
				<label for="handle" class="text-input-label">About Me</label>
				<textarea v-model="profile_form.biography" class="standard-text-area"></textarea>
			</div>
			
			<div class="center-justify">
				<button v-on:click="sendProfile()" class="wide-button primary">Save Profile</button>
			</div>
			
			<div class="message-container" v-for="message_array in messages.profile_form">
				<mark v-for="message in message_array">{{ message }}</mark>
			</div>
		</fieldset>
	</div>
	
	<div class="col-sm col-md-2 col-lg-3"></div>
</div>
`;

let profilePage = {
	template : profileTemplate,
	data : function() {
		return {
			user_form :{
				'email'		: null,
				'handle'	: null,
			} ,
			profile_form : {
				'first_name': null,
				'last_name' : null,
				'biography' : null,
				'facebook'  : null,
				'twitter'	: null,
				'twitch'	: null,
			},
			password_form : {
				'current'	: null,
				'new'		: null,
				'verify'	: null
			},
			messages : {
				user_form 			: [],
				profile_form 		: [],
				password_form		: []
			},
		}
	},
	methods : {
		sendUsername 	: function(){
			let self = this;

			VmDataSender.auth.updateUserName( this.user_form , STATE.getID() )
			.then( function( data ){
				console.log(data);

				if( data.messages ){
					self.messages.user_form = data.messages;
				} else {
					self.messages.user_form = [];
				}
			});
		},
		sendPassword 	: () => {
			console.log("Method doesn't exist yet!");
		},
		sendProfile		: function(){
			let self = this;

			VmDataSender.auth.updateProfile( this.profile_form, STATE.getID() )
			.then( function( data ){
				console.log( data );

				if( data.messages ){
					self.messages.profile_form = data.messages;
				} else {
					self.messages.profile_form = [];
				}
			});
		}
	},
	created : function(){
		let self = this;

		VmDataSender.auth.getUserData( STATE.getID() )
		.then( function( data ){
			self.user_form.handle 			= data.handle;
			self.user_form.email 			= data.email;

			self.profile_form.twitch		= data.twitch;
			self.profile_form.twitter		= data.twitter;
			self.profile_form.facebook		= data.facebook;
			self.profile_form.biography		= data.biography;
			self.profile_form.first_name	= data.first_name;
			self.profile_form.last_name		= data.last_name;
		});
	}
};

Vue.component('whprofilepage', profilePage);