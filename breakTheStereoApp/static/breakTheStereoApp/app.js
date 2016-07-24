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

SC.oEmbed('https://soundcloud.com/rafael-takasu/sets/chill', {
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

$( "#happyButton" ).click(function() {
	widget1.getPosition(function(position){
			
		//postEmotion(position,"happy")
		console.log(position,"happy")
	})
});

$( "#chillButton" ).click(function() {
	widget1.getPosition(function(position){
			
		//postEmotion(position,"chill")
		console.log(position,"chill")
	})
});

$( "#peacefulButton" ).click(function() {
	widget1.getPosition(function(position){
			
		//postEmotion(position,"peaceful")
		console.log(position,"peaceful")
	})
});

$( "#runButton" ).click(function() {
	widget1.getPosition(function(position){
			
		//postEmotion(position,"run")
		console.log(position,"run")
	})
});

$( "#singButton" ).click(function() {
	widget1.getPosition(function(position){
			
		//postEmotion(position,"sing")
		console.log(position,"sing")
	})
});

$( "#danceButton" ).click(function() {
	widget1.getPosition(function(position){
			
		//postEmotion(position,"dance")
		console.log(position,"dance")
	})
});

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



