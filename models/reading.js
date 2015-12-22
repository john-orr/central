var mongoose = require('mongoose');

var readingSchema = mongoose.Schema({
        location: String,
        timestamp: Date,
        temperature: Number
});

module.exports = mongoose.model('Reading', readingSchema);