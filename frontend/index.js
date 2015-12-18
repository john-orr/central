
$(document).ready(function() {
    var socket = io.connect();

    socket.on('newReading', function(readings){
        console.log(readings);
    });

    $.get("pastTemperatures", function(data, status){
        console.log(data);
    });

});