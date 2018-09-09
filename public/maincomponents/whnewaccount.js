let accountTemplate = `
<div class="row">
	<div class="col-sm">
	</div>
	<!-- Adding some flex properties to center the form and some height to the page, these can be omitted -->
	<div class="col-sm-12 col-md-8 col-lg-6 center-align-page">
		
		<fieldset v-on:blur="validateData();" v-if="accountCreated == 0">
			<legend>Create an Account</legend>
			<div class="input-group fluid">
				<label for="username" class="text-input-label">Username</label>
				<input type="email" value="" v-model="form.username" id="username" placeholder="Valid@email.com">
			</div>
			<br>
			
			<div class="input-group fluid">
				<label for="handle" class="text-input-label">Handle</label>
				<input type="text" value="" v-model="form.handle" id="handle" placeholder="BadAssGamer">
			</div>
			<br>
			
			<div class="input-group fluid">
				<label for="password" class="text-input-label">Password</label>
				<input type="password" value="" v-model="form.password" id="password" placeholder="">
			</div>
			<div class="input-group fluid">
				<label for="passwordverify" class="text-input-label">Verify</label>
				<input type="password" value="" id="passwordverify" placeholder="">
			</div>
			<br>
			
			<div class="message-container" v-for="message_array in messages">
				<mark v-for="message in message_array">{{ message }}</mark>
			</div>
			
			
			<div class="input-group fluid">
				<label for="notify_user">Notify me about new events!</label>
				<input type="checkbox" id="notify_user" checked>
			</div>
			
			<div class="input-group fluid">
				<button class="tertiary" v-on:click="newAccountSubmit">Sign-up!</button>
			</div>
			<hr>
			
			<div class="input-group fluid">
				<button class="primary" v-on:click="gotoLoginPage">Login Instead</button>
			</div>
		</fieldset>
		
		<div v-if="accountCreated == 1">
			<mark>Account Created!</mark>
			<button class="primary" v-on:click="gotoLoginPage">Login</button>
		</div>
		
	</div>
	<div class="col-sm">
	</div>
</div>
`;

let newAccountObject = {
	template : accountTemplate,
	data : function() {
		return {
			accountCreated: 0,
			sendnotices: 0,
			form:{
				password		: '',
				username		: '',
				handle			: '',
				notify_user		: '1',
			},
			messages: {},
		}
	},
	methods: {
		gotoLoginPage: function(){
			STATE.changeView( PAGES.WHLOGIN , "'Login Instead' Button on whnewaccount.js clicked by user")
		},
		newAccountSubmit: function(){
			let self = this;

			VmDataSender.auth.newAccount({
				email 		: this.form.username,
				password 	: this.form.password,
				notify_user : this.form.notify_user,
				handle		: this.form.handle
			})
			.then( function( data ){

				console.log(data);

				if ( data['messages'] ) {
					self.messages = data['messages'];
				} else {
					console.log('not setting');
					self.messages = {};
				};

			});
		},
		validateData : function(){
			console.log("Validate each field, return true if all fields are good");
			return true;
		}
	},
	created : function() {
		var self = this;

		let onSubmit = function () {
			let eventData = VmEventBus.getEventData( EVENTS.ACCOUNT_CREATION_REQUEST );

			if (eventData['errors']) {
				self.errors = eventData['errors'];
			} else {
				self.errors = {};
			};

			if (eventData['token']) {
				Cookies.eraseCookie('JWT');
				Cookies.createCookie('JWT', eventData.token);
				VmEventBus.emit( EVENTS.ACCOUNT_CREATION_SUCCESS );

				self.accountCreated = 1;

			} else {
				self.accountCreated = 0;
			};
		};
		VmEventBus.notify( EVENTS.ACCOUNT_CREATION_REQUEST, 'whnewaccount' , onSubmit );
	},


};
Vue.component('whnewaccount', newAccountObject);