var ReadingsDao = require('../daos/readingsDao').ReadingsDao;

module.exports = function(app, server) {

var readingsDao = new ReadingsDao();
var io = require('socket.io').listen(server);

app.post('/temperatureData', function (req, res) {
		console.log(`${req.body.length} records received`);
		var validRecords = 0;
		for(i in req.body) {
			data = req.body[i];
			if (data.name && Date.parse(data.timestamp) && data.temperature) {
				validRecords++;
				readingsDao.createReading(data, function(err, reading) {
				    if (err) {
                    	res.send("General error!");
                    } else {
                        io.sockets.emit('newReading', reading);
                    	console.log("Saved successfully:" + reading);
                    }
				});
			}
		}
		   console.log(`${validRecords} valid records`)
		   res.send(`Thanks for the data! ${validRecords} were valid`);

    });
}