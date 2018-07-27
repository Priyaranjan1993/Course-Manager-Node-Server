var mongoose = require('mongoose');
var sectionSchema = mongoose.Schema({
    sectionName: {
        type: String,
        required: true
    },
    maxSeats: {
        type: Number,
        required: false
    },
    availableSeats: {
        type: Number,
        required: false
    },
    courseId: {
        type: Number,
        required: true
    }
}, {collection: 'section'});

module.exports = sectionSchema;
