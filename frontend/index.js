var socket = io.connect();

socket.on('newReading', function(readings){
    console.log(readings);
});