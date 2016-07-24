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
	      
	    	$("#smileCounter").text(data["smile"])
	    	$("#cryCounter").text(data["cry"])
	    	$("#aversionCounter").text(data["aversion"])
	    	$("#danceCounter").text(data["dance"])
	    	$("#chillCounter").text(data["chill"])
	    	$("#rockCounter").text(data["rock"])
	    	$("#romanticCounter").text(data["romantic"])

	    }, error: function() {
	    	$("#smileCounter").text(0)
	    	$("#cryCounter").text(0)
	    	$("#aversionCounter").text(0)
	    	$("#danceCounter").text(0)
	    	$("#chillCounter").text(0)
	    	$("#rockCounter").text(0)
	    	$("#romanticCounter").text(0)
	    }
	});

	console.log(songId)

}

// Populating Database
$.ajax({
    type: "POST",
    url: "/bts/addSong/",
    data: {"song":254216170,"name": "Rhapsody in Blue","artist": "George Gershwin", "genre":"Classical"},
    success: function(data){
      console.log(data);
    }
});

function loadSimilar(){

	$.ajax({
	    type: "GET",
	    url: "/bts/similar/",
	    data: {"person": 2},
	    success: function(data){

	    	$("#person1Name").text(data[0]["name"])
	    	$("#person1Score").text(data[0]["score"])
			$("#person1Pic").css('background-image', "url('" + data[0]["profile_pic"] + "')")
	    	$("#person2Name").text(data[1]["name"])
	    	$("#person2Score").text(data[1]["score"])
			$("#person2Pic").css('background-image', "url('" + data[1]["profile_pic"] + "')")
	    	$("#person3Name").text(data[2]["name"])
	    	$("#person3Score").text(data[2]["score"])
			$("#person3Pic").css('background-image', "url('" + data[2]["profile_pic"] + "')")

	    	console.log(data)

	    }
	});

}
loadSimilar()


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

// Populating Database
$.ajax({
   type: "POST",
   url: "/bts/addSong/",
   data: {"song":254216170,"name": "Rhapsody in Blue","artist": "George Gershwin", "genre":"Classical"},
   success: function(data){
     console.log(data);
   }
});

// Populating Database
$.ajax({
   type: "POST",
   url: "/bts/addSong/",
   data: {"song":65833474,"name": "Fur Elise","artist": "Ludwig van Beethoven", "genre":"Classical"},
   success: function(data){
     console.log(data);
   }
});

// Populating Database
$.ajax({
   type: "POST",
   url: "/bts/addSong/",
   data: {"song":256281321,"name": "No More Parties in LA","artist": "Kanye West", "genre":"Classical"},
   success: function(data){
     console.log(data);
   }
});

// Populating Database
$.ajax({
   type: "POST",
   url: "/bts/addSong/",
   data: {"song":271381951,"name": "The Jam","artist": "Logic", "genre":"Classical"},
   success: function(data){
     console.log(data);
   }
});

$.ajax({
   type: "POST",
   url: "/bts/addSong/",
   data: {"song":271224728,"name": "Cool","artist": "Alesso", "genre":"Classical"},
   success: function(data){
     console.log(data);
   }
});

$.ajax({
   type: "POST",
   url: "/bts/addSong/",
   data: {"song":78726841,"name": "You Want Me","artist": "Justin Bieber", "genre":"Classical"},
   success: function(data){
     console.log(data);
   }
});

$.ajax({
   type: "POST",
   url: "/bts/addSong/",
   data: {"song":257084383,"name": "Notorious Thugs","artist": "Notorious BIG", "genre":"Classical"},
   success: function(data){
     console.log(data);
   }
});

$.ajax({
   type: "POST",
   url: "/bts/addSong/",
   data: {"song":210433784,"name": "Roses","artist": "Chainsmokers", "genre":"Classical"},
   success: function(data){
     console.log(data);
   }
});

$("#userPic").css("background-image", "url('/static/breakTheStereoApp/images/mr2hrsofsleep.jpeg')");

