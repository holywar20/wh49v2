let GlobalGenerateEventBus = function( eventList ){

	let self = this;

	let callBackRegistry = {};
	let callBackArguments = {};
	let dataBucket = {};
	let registryCount = {};

	let establishEvents = function( eventName ){
		callBackRegistry[eventName] 	= {};
		callBackArguments[eventName]	= {};
		dataBucket[eventName]			= {};
		registryCount[eventName]		= 0;
	};
	WarehouseLib.foreach( eventList , establishEvents );

	this.debug = function(){
		console.log("Callbacks Registered:");
		console.log( callBackRegistry );
		console.log("Call back arguments to look for");
		console.log(callBackArguments);
		console.log("Data Bucket");
		console.log(dataBucket);
		console.log("Event Count");
		console.log(registryCount);
	};

	/* emit
		This method handles emiting events and figuring out how to run all the registered call backs.
		It's not as complicated as it looks.

		On each registered call back ( anything that has run a 'notify' method. )
		It first looks for a hard-coded parameter with a matching name in the 2nd argument object.
		If it can't find that, it looks in the events dataBucket.
		If it can't find that, it sends a null.

		If you want this event to ignore the dataBucket, simply send a 'false' for the 3rd argument.
	 */
	this.emit = function(eventName , params = {} , dataBucketGet = true ){
		console.log("Executing " + registryCount[eventName] + " callbacks for :: " + eventName);

		WarehouseLib.foreach( callBackRegistry[eventName] , function( notifyTarget ) {

			let applyDataArray = [];
			callBackArguments[eventName][notifyTarget].forEach( function( prop ){
				if( params[prop] ){
					applyDataArray.push( params[prop] )
				} else {

					let foundProp = self.getEventDataItem( eventName, prop );

					if( foundProp && dataBucketGet )
						applyDataArray.push( foundProp );
					else
						applyDataArray.push( null );
				}
			});
			callBackRegistry[eventName][notifyTarget].apply( {} , applyDataArray );
		});

		console.log( "All events resolved for : "+ eventName );
	};

	this.getEventData = function( eventName , destroyData = false){

		let eventData = dataBucket[eventName];

		if( destroyData ){
			dataBucket[eventName] = {};
		}

		return eventData;
	};

	this.getEventDataItem = function ( eventName, item, removeWhenReturned = false){

		let datum = dataBucket[eventName][item];

		if( removeWhenReturned ){
			delete dataBucket[eventName][item];
		}

		return datum;
	};

	this.deleteOneEventCallBack = function( event, key ){
		if( callBackRegistry[event][key] ){
			delete callBackRegistry[event][key];
			delete callBackArguments[event][key];
			registryCount[event] -= 1;

			console.log("Removed a callback '" + key + "' from event : " + event);
		}
	};

	/* Event data is treated sort of like a session store.
			If data isn't overwritten, it remains available to the page.
		DataSender will always apply event Data once a reply comes from the server,
		but you can manually add data to it as well.
	 */
	this.setEventData = function( eventName , eventData ){

		for( let prop in eventData ){
			if( eventData.hasOwnProperty(prop) ){
				dataBucket[eventName][prop] = eventData[prop];
			}
		}

		dataBucket[eventName] = eventData;
	};

	this.notify = function( event , key,  callback, argumentsArray = [] ){
		console.log( "Registering ['" + key + "'] for this event: " + event + " with arguments: " );
		console.log( argumentsArray );

		if( !callBackRegistry[event] ){
			console.log("Debug: Invalid event of " + event + " indicated.");
			return false;
		}

		callBackRegistry[event][key] = callback;
		callBackArguments[event][key] = argumentsArray;
		registryCount[event]++;
	};

	return this;
};