let vueTemplate = `
<div class="row center-align-page">
	<mark>Test Object</mark>
	<mark>{{ message }}</mark>
	<button v-on="doAThing();">Change Message</button>
</div>
`;

let VueObject = new Vue({
	template 	: vueTemplate, 			// Some HTML Template.
	data		: function(){			// These properties declared here bind to HTML template, and will update template when changed.
		return {						// Items placed here are bind to 'this' in the context of the object.
			message : "Test Message"
		}
	},
	methods	: {							// These methods are meant to bind to the HTML template itself.
		doAThing : function(){
			VmEventBus.emit( EVENTS.TEST_EVENT );
		}
	},

	/* Life cylce hooks to do things automatically on creation/destruction */
	created		: function(){
		this.message = "Property is updated!";
		VmEventBus.notify( EVENTS.TEST_EVENT , 'VueObject' , VueObject.onTestEvent ); // Register for this event. Notice the use of a function name as the third param.
	},
	destroyed	: function(){
		VmEventBus.deleteOneEventCallBack( EVENTS.TEST_EVENT , 'VueObject'); // Unregister for the event. Important to avoid memory leaks and to prevent dangling events.
	},

	/* it's JS, so you can add whatever you want that makes sense to add at the root of the object. Event functions, constants.

		Vue's Magic will ignore these items, so it's a good way to keep components consistant for things that don't rely
	on Vue and avoid the trap of relying on globals or random variables that need to be created arbitrarily */

	/* By convention, all events should begin with 'on'. */
	onTestEvent : function() {
		this.message = "We responded to an event!";
	}
});