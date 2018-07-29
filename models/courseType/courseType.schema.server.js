var mongoose = require('mongoose');
var courseTypeSchema = mongoose.Schema({
    courseId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {collection: 'courseType'});


module.exports = courseTypeSchema;
