var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('user', userSchema);

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
/*
//Get Genres
module.exports.getGenres = function (callback, limit) {
  Genre.find(callback).limit(limit);
};

//Get Genres by id
module.exports.getGenreById = function (id, callback) {
  Genre.findById(id, callback);
};

//Add Genre
module.exports.addGenre = function (genre, callback) {
  Genre.create(genre, callback);
};

//Update Genre
module.exports.updateGenre = function (id, genre, options, callback) {
  var query = {_id: id};
  var update = {
    name: genre.name
  };
  Genre.findOneAndUpdate(query, update, options, callback);
};

//Delete Genre
module.exports.deleteGenre = function (id, callback) {
  var query = {_id: id};
  Genre.remove(query, callback);
};*/
