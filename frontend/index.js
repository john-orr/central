var socket = io.connect();

socket.on('hi', function(reading){
    console.log(reading);
});