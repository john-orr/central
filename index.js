var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/temperatureData', function (req, res) {
  console.log(req.body);
  res.send(req.body);
});

app.listen(7001);