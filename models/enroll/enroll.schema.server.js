var mongoose = require('mongoose');
var enrollSchema = mongoose.Schema({
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sectionModel'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    grade: String
}, {collection: 'enroll'});


module.exports = enrollSchema;
