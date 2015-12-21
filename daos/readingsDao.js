var Reading = require('../models/reading');

function ReadingsDao() {
	
	if (false === (this instanceof ReadingsDao)) {
		console.log('Warning: ReadingsDao constructor called without "new" operator');
		return new ReadingsDao();
	}
	
	this.createReading = function(data, callback) {
		var reading = new Reading();
        reading.location = data.location;
        reading.timestamp = data.timestamp;
        reading.temperature = data.temperature;
        reading.save(function(err, data) {
			callback(err, data);
        });
	}
	
	this.getReadings = function(callback) {
		Reading.find({ location: /^[A-J]$/ }, null, {sort: 'timestamp'}, function(err, readings) {
			callback(err, readings);
		});
	}
}

module.exports.ReadingsDao = ReadingsDao;