var mongoose = require('mongoose');

var readingSchema = mongoose.Schema({
        name: String,
        timestamp: Date,
        temperature: Number
});

module.exports = mongoose.model('Reading', readingSchema);