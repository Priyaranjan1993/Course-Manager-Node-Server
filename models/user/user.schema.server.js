var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: false
    }
}, {collection: 'user'});

module.exports = userSchema;
