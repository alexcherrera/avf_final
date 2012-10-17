var loadGeo = function () {
		//window.reload();
		alert("loadGeo");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		} else {
			alert("error!! Not working");
		}
	}
//When the position is received, it triggers the onSuccess
	var onSuccess = function (position) {
		console.log("Success");
        var geoTxt = document.getElementById('geoTextSuccess');
	//Created an object array containing all the coordinates
		var	geoStats = {};
			geoStats.latit   = ["Latitude:", position.coords.latitude];
			geoStats.longi   = ["longitude:", position.coords.longitude];
			geoStats.alti    = ["Altitude:", position.coords.altitude];
			geoStats.acc     = ["Accuracy:", position.coords.accuracy];
			geoStats.altAcc  = ["Altitude Accuracy:", position.coords.altitudeAccuracy];
			geoStats.head    = ["Heading:", position.coords.heading];
			geoStats.sped    = ["Speed:", position.coords.speed];
			geoStats.timStp  = ["Timestamp:", position.timestamp];
			console.log(geoStats.latit);
	//Inserting all the datat into the html doc
		geoTxt.innerHTML = '<ul><li>' + geoStats.latit[0] + " " + geoStats.latit[1] + '</li>' +
								'<li>' + geoStats.longi[0] + " " + geoStats.longi[1] + '</li>' +
								'<li>' + geoStats.alti[0] + " " + geoStats.alti[1] + '</li>' +
								'<li>' + geoStats.acc[0] + " " + geoStats.acc[1] + '</li>' +
								'<li>' + geoStats.altAcc[0] + " " + geoStats.altAcc[1] + '</li>' +
								'<li>' + geoStats.head[0] + " " + geoStats.head[1] + '</li>' +
								'<li>' + geoStats.sped[0] + " " + geoStats.sped[1] + '</li>' +
								'<li>' + geoStats.timStp[0] + " " + geoStats.timStp[1] + '</li>' +
							'</ul>';
	}
	//To display the map with the current location
		var geoMapFunc = function () {
			var map = document.getElementById('googleMapView');
			var latitLong = geoStats.latit[1] + "," + geoStats.longi[1];
			var img_url="http://maps.googleapis.com/maps/api/staticmap?center=" + latitLong + "&zoom=14&size=400x300&sensor=false";
			map.innerHTML="<img src='"+img_url+"'>";
		}
	//Calling the function to display the map
   // }
// onError Callback receives a PositionError object
    var onError = function (error) {
		var errorTxt = document.getElementById('geoTextError');
		errorTxt.innerHTML = '<ul><li>code: ' + " " + error.code + '</li>' +
                '<li>message: ' + error.message + '</li>' + '</ul>';
    }
    //navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}