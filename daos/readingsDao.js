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

	this.getReadings = function(hours, callback) {
		var queryStartDate = new Date(new Date().getTime() - (hours * 60 * 60 * 1000));
		Reading.find({location: /^[A-J]$/, timestamp : { $gt : queryStartDate }}, null, {sort: {timestamp: 1}}, function(err, readings) {
        	    callback(err, readings);
        	});
	}
}

module.exports.ReadingsDao = ReadingsDao;