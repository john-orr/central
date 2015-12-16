var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 7001;

app.use(bodyParser.json());

app.post('/temperatureData', function (req, res) {
  console.log(req.body);
  res.send(req.body);
});

console.log(`Listening on port: ${port}`);
app.listen(port);