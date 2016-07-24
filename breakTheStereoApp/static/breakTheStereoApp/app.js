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

SC.oEmbed('https://soundcloud.com/rafael-takasu/sets/breakthestereo', {
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
	widget1.bind(SC.Widget.Events.PLAY, function(){

		widget1.getCurrentSound(function(song){

			loadReactionData(song.id);

		})

	});
});

$( "#smileButton" ).click(function() {

	widget1.getCurrentSound(function(song){
		
		console.log("smile", song.id)
		var counter = parseInt($("#smileCounter").text());
		$("#smileCounter").text(counter+1)

		postEmotion(song.id,"smile")

	})

});

$( "#cryButton" ).click(function() {

	widget1.getCurrentSound(function(song){
		
		console.log("cry", song.id)
		var counter = parseInt($("#cryCounter").text());
		$("#cryCounter").text(counter+1)

		postEmotion(song.id,"cry")
	})
});

$( "#aversionButton" ).click(function() {
	
	widget1.getCurrentSound(function(song){
		
		console.log("aversion", song.id)
		var counter = parseInt($("#aversionCounter").text());
		$("#aversionCounter").text(counter+1)

		postEmotion(song.id,"aversion")
	})
});

$( "#danceButton" ).click(function() {
	
	widget1.getCurrentSound(function(song){
		
		console.log("dance", song.id)
		var counter = parseInt($("#danceCounter").text());
		$("#danceCounter").text(counter+1)

		postEmotion(song.id,"dance")
	})
});

$( "#chillButton" ).click(function() {
	
	widget1.getCurrentSound(function(song){
		
		console.log("chill", song.id)
		var counter = parseInt($("#chillCounter").text());
		$("#chillCounter").text(counter+1)

		postEmotion(song.id,"chill")
	})
});

$( "#rockButton" ).click(function() {
	
	widget1.getCurrentSound(function(song){
		
		console.log("rock", song.id)
		var counter = parseInt($("#rockCounter").text());
		$("#rockCounter").text(counter+1)

		postEmotion(song.id,"rock")
	})
});

$( "#romanticButton" ).click(function() {
	
	widget1.getCurrentSound(function(song){
		
		console.log("romantic", song.id)
		var counter = parseInt($("#romanticCounter").text());
		$("#romanticCounter").text(counter+1)

		postEmotion(song.id,"romantic")
	})
});

function loadReactionData(songId) {

	$.ajax({
	    type: "GET",
	    url: "/bts/history/",
	    data: {"person": 1, "song":songId},
	    success: function(data){
	      
	    	

	    	console.log(data);
	    }
	});

	console.log(songId)

}

$.ajax({
    type: "POST",
    url: "/bts/addSong/",
    data: {"song":254216170,"name": "Rhapsody in Blue","artist": "George Gershwin", "genre":"Classical"},
    success: function(data){
      console.log(data);
    }
});

function postEmotion(song, emotion) {

	$.ajax({
	    type: "POST",
	    url: "/bts/addReaction/",
	    data: {"person": 1, "song":song, "emotion": emotion},
	    success: function(data){
	      console.log("response back is:" + data);
	    }
	});
	
}



