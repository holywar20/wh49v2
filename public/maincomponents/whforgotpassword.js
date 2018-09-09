let forgotpasswordTemplate = `
<div class="row ">
	<div class="col-sm">
	</div>
	<!-- Adding some flex properties to center the form and some height to the page, these can be omitted -->
	<div class="col-sm-12 col-md-8 col-lg-6 center-align-page hide-scroll">
		
		<fieldset v-if=" showSendMessage == 0 ">
			<legend>Login</legend>
			<div class="input-group fluid">
				<label for="username" class="text-input-label">Username</label>
				<input type="email" value="" id="username" placeholder="This is normally your e-mail">
			</div>

			<div class="input-group fluid">
				<button v-on:click="sendRecovery" class="primary" >Send Recovery</button>
			</div>
		</fieldset>
		
		<div class="user-message" v-if=" showSendMessage == 1 ">
			<mark class="tertiary">Recovery E-mail Sent!</mark>
			<hr>
			
			<div class="input-group fluid">
				<button v-on:click="gotoLoginPage" class="primary" >Go to Login</button>
			</div>
		</div>
	</div>
	
	<div class="col-sm">
	</div>
</div>
`;

let newForgotPasswordObject = {
	template : forgotpasswordTemplate,
	data : function() {
		return {
			'username' : '' ,
			'showSendMessage' : 0,
			'emailValid'  : false
		}
	},
	methods: {
		sendRecovery : function(){
			this.showSendMessage = 1;
		},
		gotoLoginPage : function(){
			STATE.changeView( C.Pages.WHLOGIN , "'Go to Login page' Button on whforgotpassword.js clicked by user")
		},
		verifyIsEmail : function(){

		}
	}
};

Vue.component('whforgotpassword', newForgotPasswordObject);
