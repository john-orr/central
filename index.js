var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = process.env.PORT || 7001;

var db = mongoose.connect("mongodb://ellis:crEmona9@ds033125.mongolab.com:33125/micro_climate_monitor");

var server = app.listen(port);
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
})

db.connection.on('connected', function() {
    app.use(bodyParser.json());
    app.use(express.static(__dirname + "/frontend"));
    //setup scehema before post, maybe save in sep file
    var readingSchema = mongoose.Schema({
        name: String,
        timestamp: Date,
        temperature: Number
    });
    var Reading = mongoose.model('Reading', readingSchema);
    app.post('/temperatureData', function (req, res) {
        if (req.body.name && Date.parse(req.body.timestamp) && req.body.temperature) {
        	var tempData = new Reading();
		  	tempData.name = req.body.name;
            tempData.timestamp = req.body.timestamp;
            tempData.temperature = req.body.temperature;
            //taking the data from temperatureDate and logging it into the schema
            console.log("Saving: " + tempData); //print which tempData is being saved
            //final step to send to db
            tempData.save(function(err, success) {
                if (err) {
                    res.send("General error!");
                } else {

				    console.log("Saved successfully:" + success)
                    res.send("Saved successfully:" + success);
                }
            });   
        } else {
          io.sockets.emit('hi', "hessj");
		  res.send(`Invalid data: ${JSON.stringify(req.body)}`);
		}
    });
    console.log(`Listening on port: ${port}`);
});

db.connection.on('error', function(err) {
  console.log('Error connecting to: ' + connections.url + " " + err);
});

db.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});



