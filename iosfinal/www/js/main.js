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
			$("#data-msg").html("<p>Data Success</p>");
            for (var i=0, j=data.results.length; i<j; i++) {
                $("#data-msg").append("<li>" + "<p>" + "<img src='" + data.results[i].profile_image_url + "' />" + "<br />" + data.results[i].text + ", <em>" + data.results[i].created_at + "</em>" + "</p>" + "</li>");
            }
            var getJSONTwt = document.getElementById("getJSON");
            getJSONTwt.innerHTML = "<ul><li>" + "Twitter Info" + "</li></ul>";
            for (i=0, j=data.results.length; i<j; i++) {
                getJSONTwt.append("<ul><li><img src='" + data.results[i].profile_image_url + "' />" + "<p>" + data.results[i].from_user + "</p>" + "<p>" + data.results[i].text + "</p></ul></li>" + "<br />");
            }
        });
	});
};
//Facebook
var loadFaceBk = function () {
	alert("facebkLink");
	$(function () {
		$.getJSON("https://graph.facebook.com/search?q=courses",
		function(dataFacebk) {
			console.log(dataFacebk);
			$("#data-msg-facbk").html("<p>Data Success</p>");
			for (var f=0, b=dataFacebk.data.length; f<b; f++) {
				if(dataFacebk.data[f].picture) {
					$("#data-msg-faceBk").append("<li>" + "<p id='fBkTxt'>" + "<img src='" + dataFacebk.data[f].picture + "' />" + "<br />" + dataFacebk.data[f].from.name + "<br />" + dataFacebk.data[f].message + ", <em>" + dataFacebk.data[f].updated_time + "</em>" + "</p>" + "</li>");
				} else {
					$("#data-msg-faceBk").append("<li>" + "<p id='fBkTxt'>" + "<br />" + dataFacebk.data[f].from.name + "<br />" + dataFacebk.data[f].message + ", <em>" + dataFacebk.data[f].updated_time + "</em>" + "</p>" + "</li>");
				}
			}
		});
	});
};
//Week 1
var loadWeek1 = function () {
	alert("week1");
	$(function () {
		var wk1Txt = document.getElementById("wk1Text");
		wk1Txt.innerHTML = ('<ul><li id="doc1Txt">' +
			'<p id="w1Quest1">What types of native features (on Android and iOS devices) would you be able to implement with the use of HTML/CSS/JS only?</p>' +
			'<p id="w1Answer1">By understanding the concept of native apps and the many opportunities that it brings I’m able to know which features to use on a given language. In this case the type of features that I would implement in my current project with HTML, CSS, and JS would be camera, contacts, geolocation, notifications, and storage.</p>' +
			'<p id="w1Quest2">What types of features do you think will pair well together in an app?</p>' +
			'<p id="w1Answer2">Please describe any design and functionality intentions you may have for your Demo app components this month.</p>' +
			'<p id="w1txt1">Briefly describe some past lessons learned regarding workflow as it relates to research, design, development, etc.</p>' +
			'<p id="w1txt2">As for this course will be working on two platforms which are IOS and Android and by using PhoneGap it allows us to use all of it features. By working with my project and inventing new ideas I want the app to be able to combine its calendar on the user’s phone with my app, which is a organizer for mostly college students. Another feature that I would like to have would be by allowing the user’s to take a picture from their phone and be able to attach it to a professor’s name or a contact name that.</p>'
		);
		var wk1Video = document.getElementById("wk1Video");
		wk1Video.innerHTML = ('<video width="640" height="480" controls="controls">' +
			'<source src="videos/Reflection_AVF_1.mp4" type="video/mp4"/>'
		);
	
	});
};
//Week 2
var loadWeek2 = function () {
	alert("week2");
	$(function () {
		var wk2Txt = document.getElementById("wk2Text");
		wk2Txt.innerHTML = ('<ul><li id="doc2Txt">' +
			'<p id="w2Quest1">What are some of the ways that you could change your HTML on your Demo app to be more accessible?</p>' +
			'<p id="w2Answer1">To begin with, I been changing my HTML code around for it to be more understanding to me but in my final change of my HTML code I been using a lot of div tags. In regards to this discussion I do not have my application designed to be accessible because I really forgot about that concept. By doing the research I learned how I could improve my application by using an accessibility validator. The accessibility validator would look through my HTML code and show me what seems to be not accessible and by using that tool I can input attributes to make it more accessible. The first concept I would add is the alternative text, which allows users who are using screen readers, have their images turned off, or are using a tool to help them know what are the images that are on the application or web site being displayed. In addition I would implement the noframes element that allows screen readers and any other tools to work and be able to be used by search engines. Compared to just using frames, which does not work very well with screen readers and with robots that are used for the search engines. The noframes element is sort of a copy of the original application or website but hardly users know about it because it’s mainly used for users that accessibility feature so it does not have to be very graphically designed but has to be readable and understandable.</p>' +
			'<p id="w2Quest2">Common frustrations (or common support mechanisms) that you see among the examples that are given - how could you fix them (or use them)?</p>' +
			'<p id="w2Answer2">After seeing videos of the types of attributes that are in the ARIA live regions such as aria-live and aria-atomic I’ve noticed how it works with screen readers such as Jaws eleven. One issue that caught my attention was when theirs multiple changes in a page the screen reader does not mention it if the correct attribute is not in the code. With regards of me fixing such an issue I do not know how to answer, only I could say is adding the correct attribute the same way as it was demonstrated in the video.</p>' +
			'<p id="w2Quest3">Devices: Please list two devices (and some of their features) that are made specifically to support Accessibility:</p>' +
			'<p id="w2Answer3">The first device that supports accessibility is the iPhone5 running on IOS 6. Some of the features include VoiceOver, screen reader, screen magnification, playback of closed-captioned videos, mono audio and reverse video, and many more. The second device would be an Android phone running on the operating system Jelly Bean 4.1. The feature under accessibility includes gesture mode, focus, text traversal, talk back, and more.</p>' +
			'<p id="w2Quest4">Mobile Apps: Please list two apps (either Android or iOS, or both) that are made specifically to support Accessibility:</p>' +
			'<p id="w2Answer4">The first application is called Proloquo2G0 that works for IOS and it’s from the company AssistiveWare. The application allows users who a speaking disability to communication with others by having built-in natural sounding speech voices that produces text-to-text, symbols, conjugations, and more. The second application is called Spiel, which is similar to Talk Back but one key difference is that it uses synthesized speech in order to describe actions and events.</p>'
			
		);
		var wk2Video = document.getElementById("wk2Video");
		wk2Video.innerHTML = ('<video width="640" height="480" controls="controls">' +
			'<source src="videos/Reflection_AVF_2.mp4" type="video/mp4"/>'
		);
	});
};
//Week 3
var loadWeek3 = function () {
    alert("week3");
    $(function () {
        var wk3Txt = document.getElementById("wk3Text");
        wk3Txt.innerHTML = ('<ul><li id="doc3Txt">' +
            '<p id="w3Quest1">What are the top selling app categories in the U.S.?</p>' +
            '<p id="w3Answer1">To begin with, by conducting my research I got an understanding on how the mobile technology market is comprised based on the many operating systems (OS), applications (apps), market location, and more. As for this activity, I only had to do research for three market (U.S., Japanese, and Great Britain) and for devices running on the OS of Android and IOS. For the first set of questions I have found that in the U.S. market the top selling app categories are games, news, navigation, social media, and music.</p>' +
            '<p id="w3Quest2">What are the top selling app categories in Japan?</p>' +
            '<p id="w3Answer2">In the Japanese market the top selling app categories are games, entertainment, social media, utilities, and photography.</p>' +
            '<p id="w3Quest3">What are the top selling app categories in Great Britain?</p>' +
            '<p id="w3Answer3">Lastly on the top selling app categories but this time in the UK market are navigation, weather, social media, games, and news.</p>' +
            '<p id="w3Quest4">Based on your three answers above, what might you infer about each of the markets listed?</p>' +
            '<p id="w3Answer4">By analyzing all the categories from the three markets I have concluded that the apps are based on location, culture, and the society. For example, as we all know that the public transportation system in the U.S. is not the same as in other countries. A lot of individuals in other countries as in the UK and Japan depend on public transportation almost 90% of the time and use apps such as maps for bus routes, train, and other types of transportation.</p>' +
            '<p id="w3Quest5">What percentage of Android users have the latest/greatest OS in the U.S? in Japan? in Great Britain? How might these differences impact development?</p>' +
            '<p id="w3Answer5">By looking at the android developers website I came across the percentage of users for each android OS and for the recent OS, which is called Jelly Bean and the percentage amount of users is 1.8% worldwide. Jelly Bean was released recently but has been increasing in the amount of users. The most amount of users are using the Gingerbread OS that has 55.5% worldwide of users. Going back to the three markets I was not able to find the percentage of users using the latest OS of Android like it has recent been released but I have found the percentage of the overall Android devices and IOS devices in all three markets. In the Japanese market is the overall is 64% for Android users and 32% for IOS users. In the U.S. market the number of Android users is 52.6% and 34.3% for IOS. Lastly in the UK market 23.5% are Android users and 30.5% are the number of IOS users. For IOS devices there isn’t really a big impact on development based on OS because it’s very easy to update the devices compared to the Android devices. In regards to Android devices manufactures that release these devices may not be compatible to updates. Most manufactures don’t allow their Android devices to upgrade for multiple reasons such as they would make changes to the user interface (UI) and add apps of their own that are not in Android app market place. By having manufactures to keep there changes to the Android devices requires them to block access to updates because once the device is updated it can cause internal damage to the phone such as the apps not working and would cause the manufactures money to have developers adapt the update to their phones. Another reason for manufactures to block updates is for the consumers to buy another device that is running on the latest OS.</p>' +
            '<p id="w3Quest6">What is the average cost and bandwidth limits per user (in general) in each of the three markets? How may this impact development?</p>' +
            '<p id="w3Answer6">Once again I could not find information based on the individual markets but if anyone knows a website that has this information I would really appreciate it if you would send me the link. What I have found is the overall results of all the markets in regards to the cost of megabytes (MB). The cost per MB worldwide based on U.S. dollars was $0.03 for this year (2012). By looking over the data that started in 2008 with the cost at $0.48 I have noticed that this big drop has been the cost of many users getting large data plans or unlimited data plans that will be explained later. Based on the chart of the monthly activity of mobile traffic per device, this year (2012) the monthly usage was 1,041.5 MB and in 2008 it was at 149 MB. The impact that this may cause is based on the carriers in my opinion. There is a lot of demand for Internet and carriers are having a hard time to accommodate to the demand. I have seen from person experience an issue with the company AT&T, when I bought my first iPhone in 2008 I got the unlimited data plan, which now is not offered anymore but I was grandfathered in to keep the unlimited data. Now people that don’t have unlimited data are paying for plans that are about the same price that I pay. I have heard that AT&T lowers the Internet speed of your user’s devices that have unlimited data once they reach a certain amount of Gigabytes (GB) used per month.</p>' +
            '<p id="w3Quest7">What would be your suggested strategy in project topic and global market choice?</p>' +
            '<p id="w3Answer7">By looking at all my research on the certain markets and the other concepts I have decided to base my new project on an app that is under the social media category because it is used in all markets and it the top-selling category. For the type of OS in regards to Android I would have the app be capable to work on devices running from Gingerbread to Jelly Bean because Gingerbread has the most user usage. I would try to also base the application on bandwidth friendly, such as having some of its features already included in the app and not to access the internet, yes the app would take more memory on the device but wont affect your bandwidth usage.</p>'
        );
		var wk3Video = document.getElementById("wk3Video");
		wk3Video.innerHTML = ('<video width="640" height="480" controls="controls">' +
			'<source src="videos/Reflection_AVF_3.mp4" type="video/mp4"/>'
		);
    });
};
//Variables storing the element ID's to be later called
var geoCall = document.getElementById("geoLink");
var cameraCall = document.getElementById("camLink");
var twtCall = document.getElementById("twitterLink");
var faceBkCall = document.getElementById("facebkLink");
var wk1Call = document.getElementById("wkOneTxt");
var wk2Call = document.getElementById("wkTwoTxt");
var wk3Call = document.getElementById("wkThreeTxt");

//Event listeners
//Geolocation API event listener
geoCall.addEventListener('click', getGeo);
//Camera API event listener
cameraCall.addEventListener('click', capturePhoto);
//Twitter API event listener
twtCall.addEventListener('click', loadTwitter);
//Facebook API event listener
faceBkCall.addEventListener('click', loadFaceBk);
//Week1 event listener
wk1Call.addEventListener('click', loadWeek1);
//Week2 event listener
wk2Call.addEventListener('click', loadWeek2);
//Week3 event listener
wk3Call.addEventListener('click', loadWeek3);




