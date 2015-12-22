var ReadingsDao = require('../daos/readingsDao').ReadingsDao;

module.exports = function(app, server) {
	
	var readingsDao = new ReadingsDao();
	var io = require('socket.io').listen(server);

    app.post('/temperatureData', function (req, res) {
		console.log(`${req.body.length} records received`);
		var validRecords = 0;
		for(i in req.body) {
			data = req.body[i];
			if (data.location && Date.parse(data.timestamp) && data.temperature) {
				validRecords++;
				readingsDao.createReading(data, function(err, reading) {
					if (err) {
						console.log("General error!");
					} else {
						if (new RegExp("^[A-J]$").test(reading.location)) {
							io.sockets.emit('newReading', reading);
						}
						console.log("Saved successfully:" + reading);
					}
				});
			}
		}

		console.log(`${validRecords} valid records`)
		res.send(`Thanks for the data! ${validRecords} were valid`);
	});
	
	app.get('/pastTemperatures/:hours', function(req, res) {
		readingsDao.getReadings(req.params.hours, function(err, readings) {
			res.json(readings);
		});
	});
}