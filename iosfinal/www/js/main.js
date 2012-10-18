document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
	alert("Your device is ready");
}
//Geolocation API Section
function getGeo () {
//To display the map with the current location
	var geoMapFunc = function (latit, longi) {
		var map = document.getElementById('geoMapDisp');
		var latitLong = latit + ", " + longi;
		var img_url="http://maps.googleapis.com/maps/api/staticmap?center=" + latitLong + "&zoom=14&size=400x300&sensor=false";
		map.innerHTML="<img src='"+img_url+"'>";
	}
//When the position is received, it triggers the onSuccess
	var onSuccess = function (position) {
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
	var onError = function (error) {
		var getErrorTxt = document.getElementById("geoLocMiss");
		getErrorTxt.innerHTML = 'code: '    + error.code    + '\n' +
		'message: ' + error.message + '\n';
	}
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
//Camera API Section
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
//Take picture using device camera and retrieve image as base64-encoded string
var capturePhoto = function () {
	alert("capturePhoto");
	var pictureSource=navigator.camera.PictureSourceType;
	var destinationType=navigator.camera.DestinationType;
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL,
	targetWidth: 200,
	targetHeight: 375 });
}
//Retrieve image file location from specified source
var getPhoto = function (source) {
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	destinationType: Camera.DestinationType.FILE_URI,
	sourceType: 1});
}
//Function called if something bad happens.
var onFail = function (message) {
	alert('Failed because: ' + message);
}
//Twitter
var loadTwitter = function () {
    alert("twt");
    $(function () {
        $.getJSON("http://search.twitter.com/search.json?q=class&schedule&include_entities=true&callback=?",
        function(data) {
            console.log(data);
           // alert("funTwt");
            //alert(data.completed_in);
            
            $("#data-msg").html("<p>Data Success</p>");
            for (var i=0, j=data.results.length; i<j; i++) {
                $("#data-msg").append("<li>" + "<p>" + "<img src='" + data.results[i].profile_image_url + "' />" + "<br />" + data.results[i].text + ", <em>" + data.results[i].created_at + "</em>" + "</p>" + "</li>");
            }
            var getJSONTwt = document.getElementById("getJSON");
            getJSONTwt.innerHTML = "<ul><li>" + "Twitter Info" + "</li></ul>";
            //$("#getJSON").html("<p>Info Fetched</p>");
            for (i=0, j=data.results.length; i<j; i++) {
                getJSONTwt.append("<ul><li><img src='" + data.results[i].profile_image_url + "' />" + "<p>" + data.results[i].from_user + "</p>" + "<p>" + data.results[i].text + "</p></ul></li>" + "<br />");
            }
        });
        });
};
//Facebook
var loadFaceBk = function () {
	alert("facebkLink");
    if ($("#facebkLink").click()) {
    $(function () {
        $.getJSON("https://graph.facebook.com/search?q=courses",
        function(dataFacebk) {
            console.log(dataFacebk);
            //alert("funFacebk");
            //alert(dataFacebk.completed_in);
            
            $("#data-msg-facbk").html("<p>Data Success</p>");
            for (var f=0, b=dataFacebk.data.length; f<b; f++) {
                $("#data-msg-faceBk").append("<li>" + "<p id='fBkTxt'>" + "<img src='" + dataFacebk.data[f].picture + "' />" + "<br />" + dataFacebk.data[f].from.name + "<br />" + dataFacebk.data[f].message + ", <em>" + dataFacebk.data[f].updated_time + "</em>" + "</p>" + "</li>");
            }
            var getJSONfaceBK = document.getElementById("getJSON-faceBk");
            getJSONfaceBK.innerHTML = "<ul><li>Twitter Info</li></ul>";
            //$("#getJSON").html("<p>Info Fetched</p>");
            for (i=0, j=dataFacebk.results.length; i<j; i++) {
                getJSONfaceBK.append("<img src='" + dataFacebk.results[i].profile_image_url + "' />" + "<p>" + dataFacebk.results[i].from_user + "</p>" + "<p>" + dataFacebk.results[i].text + "</p>" + "<br />");
            }
        });
    });
	}
}

//Variables storing the element ID's to be later called
var geoCall = document.getElementById("geoLink");
var cameraCall = document.getElementById("camLink");
var twtCall = document.getElementById("twitterLink");
var faceBkCall = document.getElementById("facebkLink");

//Event listeners
//Geolocation API event listener
geoCall.addEventListener('click', getGeo);
//Camera API event listener
cameraCall.addEventListener('click', capturePhoto);
//Twitter API event listener
twtCall.addEventListener('click', loadTwitter);
//Facebook API event listener
faceBkCall.addEventListener('click', loadFaceBk);

	




