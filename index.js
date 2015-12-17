var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = process.env.PORT || 7001;

var db = mongoose.connect("mongodb://ellis:crEmona9@ds033125.mongolab.com:33125/micro_climate_monitor");

db.connection.on('connected', function() {
    app.use(bodyParser.json());
    app.use(express.static(__dirname + "/frontend"));
    app.post('/temperatureData', function (req, res) {
      console.log(req.body);
      res.send(req.body);
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



