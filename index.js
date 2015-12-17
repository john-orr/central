var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 7001;
var db = mongoose.connect("mongodb://ellis:crEmona9@ds033125.mongolab.com:33125/micro_climate_monitor");

db.connection.on('connected', function() {
    var server = app.listen(port);
    var io = require('socket.io').listen(server);

    app.use(bodyParser.json());
    app.use(express.static(__dirname + "/frontend"));
    var readingSchema = mongoose.Schema({
        name: String,
        timestamp: Date,
        temperature: Number
    });
    var Reading = mongoose.model('Reading', readingSchema);
    app.post('/temperatureData', function (req, res) {
		console.log(`${req.body.length} records received`);
		var validRecords = 0;
		for(i in req.body) {
			data = req.body[i];
			if (data.name && Date.parse(data.timestamp) && data.temperature) {
				validRecords++;
				var tempData = new Reading();
				tempData.name = data.name;
				tempData.timestamp = data.timestamp;
				tempData.temperature = data.temperature;
				//taking the data from temperatureDate and logging it into the schema
				//final step to send to db
				tempData.save(function(err, success) {
					if (err) {
						res.send("General error!");
					} else {
					    io.sockets.emit('newReading', success);
						console.log("Saved successfully:" + success);
					}
				});   
			}
		}
		console.log(`${validRecords} valid records`)
		res.send(`Thanks for the data! ${validRecords} were valid`);
    });
    console.log(`Listening on port: ${port}`);
});

db.connection.on('error', function(err) {
  console.log('Error connecting to: ' + connections.url + " " + err);
});

db.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});



