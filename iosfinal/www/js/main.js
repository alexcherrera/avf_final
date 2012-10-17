document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
	//alert("Your device is ready");
	//pictureSource=navigator.camera.PictureSourceType;
	//destinationType=navigator.camera.DestinationType;
}
//Geolocation API Section
function getGeo () {
//To display the map with the current location
	function geoMapFunc (latit, longi) {
		var map = document.getElementById('geoMapDisp');
		var latitLong = latit + ", " + longi;
		var img_url="http://maps.googleapis.com/maps/api/staticmap?center=" + latitLong + "&zoom=14&size=400x300&sensor=false";
		map.innerHTML="<img src='"+img_url+"'>";
	}
//When the position is received, it triggers the onSuccess
	function onSuccess (position) {
		console.log("Success");
        var geoTxt = document.getElementById("geoLocaInfo");
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
//Inserting all the datat into the html doc
		geoTxt.innerHTML = '<ul><li>' + geoStats.latit[0] + " " + geoStats.latit[1] + '</li>' +
								'<li>' + geoStats.longi[0] + " " + geoStats.longi[1] + '</li>' +
								'<li>' + geoStats.alti[0] + " " + geoStats.alti[1] + '</li>' +
								'<li>' + geoStats.acc[0] + " " + geoStats.acc[1] + '</li>' +
								'<li>' + geoStats.altAcc[0] + " " + geoStats.altAcc[1] + '</li>' +
								'<li>' + geoStats.head[0] + " " + geoStats.head[1] + '</li>' +
								'<li>' + geoStats.sped[0] + " " + geoStats.sped[1] + '</li>' +
								'<li>' + geoStats.timStp[0] + " " + geoStats.timStp[1] + '</li>';
		geoMapFunc(geoStats.latit[1], geoStats.longi[1]);
	}
// onError Callback receives a PositionError object
	function onError (error) {
		var getErrorTxt = document.getElementById("geoLocMiss");
		getErrorTxt.innerHTML = 'code: '    + error.code    + '\n' +
		'message: ' + error.message + '\n';
	}
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
//Camera API Section
//var onCameraLoad = function () {
//document.addEventListener('deviceready', onDeviceReady, false);
	/*function onDeviceReady() {
		alert("Your Camera is ready");
		pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }*/
//	alert("camera1");
	var onPhotoDataSuccess = function (imageData) {
		alert("photoDTSuccess");
		alert(imageData);
		var smallImage = document.getElementById('picSmall');
		smallImage.style.display = 'block';
		smallImage.src = "data:image/jpeg;base64," + imageData;
	}
	var onPhotoURISuccess = function (imageURI) {
		alert("photoURIS");
		alert(imageURI);
		var largeImage = document.getElementById('picLarge');
		largeImage.style.display = 'block';
		largeImage.src = imageURI;
	}
	var capturePhoto = function () {
		alert("capturePhoto");
      // Take picture using device camera and retrieve image as base64-encoded string
		var pictureSource=navigator.camera.PictureSourceType;
        var destinationType=navigator.camera.DestinationType;
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL,
	    targetWidth: 200,
	    targetHeight: 375 });
    }
	/*function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
    }*/
	var getPhoto = function (source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: 1});
    }

    // Called if something bad happens.
    // 
    var onFail = function (message) {
      alert('Failed because: ' + message);
    }
	//capturePhoto();
//}


//Variables storing the element ID's to be later called
var geoCall = document.getElementById("geoLink");
var cameraCall = document.getElementById("camLink");

//Event listeners
geoCall.addEventListener('click', getGeo);
//cameraCall.addEventListener('click', onCameraLoad);
cameraCall.addEventListener('click', capturePhoto);

	




