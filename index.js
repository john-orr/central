var express = require('express');
var connections = require('./config/connections');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || connections.devPort;
var db = mongoose.connect(connections.mongoDb);
var routes = require('./routes/routes');

db.connection.on('connected', function() {
    app.use(bodyParser.json());
    app.use(express.static(__dirname + "/frontend"));
    routes(app, app.listen(port));
    console.log(`Listening on port: ${port}`);
});

db.connection.on('error', function(err) {
  console.log('Error connecting to: ' + connections.url + " " + err);
});

db.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});



