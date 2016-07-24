console.log("Javascript works");
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

// ADD REACTION
$.ajax({
    type: "POST",
    url: "/bts/addReaction/",
    data: {"person": 1, "song":1, "emotion": "smile"},
    success: function(data){
      console.log("response back is:" + data);
    }
});

//Get Reaction History
$.ajax({
    type: "GET",
    url: "/bts/history/",
    data: {"person": 1, "song":1},
    success: function(data){
      console.log(data);
    }
});

//Get most similar
$.ajax({
    type: "GET",
    url: "/bts/similar/",
    data: {"person": 2, "song":1},
    success: function(data){
      console.log(data);
    }
});



