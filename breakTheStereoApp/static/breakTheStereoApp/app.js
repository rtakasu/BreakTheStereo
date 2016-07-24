// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

var widget1

SC.oEmbed('https://soundcloud.com/rafael-takasu/sets/s-track-boa-1', {
	element: document.getElementById('putTheWidgetHere'),
	show_comments:false,
	show_user:false,
	show_playcount:false,
	default_height:1000,
	buying:false,
	sharing:false,
	download:false
}).then(function(embed){
	var iframeElement   = document.querySelector('iframe');
	widget1 = SC.Widget(iframeElement);
});

$( "#smileButton" ).click(function() {

	widget1.getCurrentSound(function(song){
		
		widget1.getPosition(function(position){

			console.log(position,"smile", song.id)
			var counter = parseInt($("#smileCounter").text());
			$("#smileCounter").text(counter+1)

			//postEmotion(position,"smile")

		})
	})
});

$( "#cryButton" ).click(function() {

	widget1.getCurrentSound(function(song){
		
		widget1.getPosition(function(position){

			console.log(position,"cry", song.id)
			var counter = parseInt($("#cryCounter").text());
			$("#cryCounter").text(counter+1)

			//postEmotion(position,"smile")

		})
	})
});

$( "#aversionButton" ).click(function() {
	
	widget1.getCurrentSound(function(song){
		
		widget1.getPosition(function(position){

			console.log(position,"aversion", song.id)
			var counter = parseInt($("#aversionCounter").text());
			$("#aversionCounter").text(counter+1)

			//postEmotion(position,"smile")

		})
	})
});

$( "#danceButton" ).click(function() {
	
	widget1.getCurrentSound(function(song){
		
		widget1.getPosition(function(position){

			console.log(position,"dance", song.id)
			var counter = parseInt($("#danceCounter").text());
			$("#danceCounter").text(counter+1)

			//postEmotion(position,"smile")

		})
	})
});

$( "#chillButton" ).click(function() {
	
	widget1.getCurrentSound(function(song){
		
		widget1.getPosition(function(position){

			console.log(position,"chill", song.id)
			var counter = parseInt($("#chillCounter").text());
			$("#chillCounter").text(counter+1)

			//postEmotion(position,"smile")

		})
	})
});

$( "#rockButton" ).click(function() {
	
	widget1.getCurrentSound(function(song){
		
		widget1.getPosition(function(position){

			console.log(position,"rock", song.id)
			var counter = parseInt($("#rockCounter").text());
			$("#rockCounter").text(counter+1)

			//postEmotion(position,"smile")

		})
	})
});

$( "#romanticButton" ).click(function() {
	
	widget1.getCurrentSound(function(song){
		
		widget1.getPosition(function(position){

			console.log(position,"romantic", song.id)
			var counter = parseInt($("#romanticCounter").text());
			$("#romanticCounter").text(counter+1)

			//postEmotion(position,"smile")

		})
	})
});


// $.ajax({
//     type: "POST",
//     url: "/bts/addReaction/",
//     data: {"person": 1, "song":1, "emotion": "sad"},
// }).done(function(data){console.log("this is the data"); console.log(data);});


function postEmotion(position, emotion) {

	$.ajax({
	    type: "POST",
	    url: "/bts/addReaction/",
	    data: {"person": 1, "song":1, "emotion": emotion},
	    success: function(data){
	      console.log("response back is:" + data);
	    }
	});
	
}



