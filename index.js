var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = process.env.PORT || 7001;

var db = mongoose.connect("mongodb://ellis:crEmona9@ds033125.mongolab.com:33125/micro_climate_monitor");

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
        console.log(req.body);
        //parser
        var tempData = new Reading();
        var timestamp = Date.parse(req.body.timestamp);
        if (req.body.name && timestamp && req.body.temperature)
            {
                tempData.name = req.body.name;
                tempData.timestamp = timestamp;
                tempData.temperature = req.body.temperature;
                //taking the data from temperatureDate and logging it into the schema
                console.log("saving: " + tempData); //print which tempData is being saved
                //final step to send to db
                tempData.save(function(err, success) {
                    if (err) {
                        res.send("general error!");
                    } else {
                        res.send("saved successfully" + success);
                    }
                });   
            }
    });
    console.log(`Listening on port: ${port}`);
    app.listen(port);
});




db.connection.on('error', function(err) {
  console.log('Error connecting to: ' + connections.url + " " + err);
});

db.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});



