var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);

module.exports.addUser = function (user, callback) {
    return userModel.create(user, callback);
};

module.exports.login = function (user, callback) {
    return userModel.findOne({userName: user.userName, password: user.password});
};

module.exports.getUserbyName = function (userName, callback) {
    return userModel.findOne({userName: userName})
};

module.exports.getProfileById = function (userName, callback) {
    return userModel.findOne({userName: userName})
};

module.exports.saveProfile = function (profile, id, callback) {

    var id = {_id: id};
    var updateProfile = {
        userName: profile.username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        mobile: profile.phone,
        address: profile.address
    };
    return userModel.findOneAndUpdate(id, updateProfile, callback);
};
