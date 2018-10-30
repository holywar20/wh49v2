var GlobalCookies = function(){

	this.createCookie = function(name,value,days) {
		var expires = "";
		if ( days ) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = " "+name + "=" + value + expires + "; path=/";
	};

	this.readCookie = function(name) {

		console.log(document.cookie);
		console.log(name);

		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		// TODO : There is a bug here, not all cookies will have a leading ' ' space, which means sometimes the token doesn't get read properly.
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while ( c.charAt(0)==' ' ) {
				c = c.substring(1,c.length);
				if ( c.indexOf(nameEQ) == 0 )
				{
					console.log(nameEQ);
					console.log(c.substring(nameEQ.length,c.length));
					return c.substring(nameEQ.length,c.length);
				}

			}
		}
		return null;
	};

	this.eraseCookie = function(name) {
		this.createCookie(name,"",-1);
	};

	return this;
};