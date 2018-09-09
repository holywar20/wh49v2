let loginTemplate = `
<div class="row center-align-page">
	
	<div class="row col-sm-12">
		<div class="col-md-3 col-lg-5"></div>
		
		<div class="col-sm-12 col-md-6 col-lg-2">
			<fieldset>
				<legend class="logo-legend">
					<img src="images/Sticker-Small.png">
					&nbsp;&nbsp;
					<span class="stupid-fucking-absolute-position-hack">Login</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</legend>
				
				<div class="input-group fluid">
					<label for="username" style="width: 80px;">Username</label>
					<input type="email" autocomplete="current-username" v-model="form.username" id="username" placeholder="username">
				</div>
				<div class="input-group fluid">
					<label for="password" style="width: 80px;">Password</label>
					<input type="password" autocomplete="password" v-model="form.password" id="password" placeholder="password">
				</div>
				<div class="input-group fluid">
					<button class="primary"  v-on:click="login" >Login</button>
					<button class="tertiary" v-on:click="newAccount">New Account</button>
				</div>
				
				<div class="message-container" v-for="message_array in messages.form">
					<mark v-for="message in message_array">{{ message }}</mark>
				</div>
				
				<hr>
				<div class="input-group fluid">
					<button class="secondary" v-on:click="forgotPassword">Forgot password?</button>
				</div>
			</fieldset>
		</div>
		
		<div class="col-md-3 col-lg-5"></div>
	</div>
</div>
`;

let loginObject = {
	template : loginTemplate,
	data : function(){
		return{
			form :{
				username 	: '',
				password	: ''
			},
			messages : []
		}
	},
	methods: {
		login: function(){
			let self = this;

			VmDataSender.auth.login({
				username 	: this.form.username,
				password 	: this.form.password,
			})
			.then( function( data ){

				if( data['messages'] ){
					self.messages = data['messages'];
				} else {
					self.messages = [];
				}

				if( data['token'] ){
					VmEventBus.setEventData( EVENTS.LOGIN_SUCCESS, {
						token 	: data['token'],
						access 	: data['access'],
						id		: data['id']
					});
					VmEventBus.emit( EVENTS.LOGIN_SUCCESS )
				}
			});
		},
		newAccount: function(){
			STATE.changeView( PAGES.WHNEWACCOUNT , "'New Account' Button on whlogin.js clicked by user")
		},
		forgotPassword: function(){
			STATE.changeView( PAGES.WHFORGOTPASSWORD , "'Forgot Password' Button on whlogin.js clicked by user")
		},
		validateEmail : function(){
			console.log("TODO - validating email");
		},
		validatePassword : function(){
			console.log("TODO - validating password")
		}
	},
	created : function(){

	},
	destroyed : function(){

	}
};

Vue.component('whlogin', loginObject);