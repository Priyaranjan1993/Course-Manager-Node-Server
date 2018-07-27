var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('section', sectionSchema);

module.exports.addSection = function (section,callback) {
    return sectionModel.create(section, callback);
};

module.exports.deleteSection = function (sectionId,callback) {
    var secId = {_id: sectionId};
    return sectionModel.remove(secId, callback);
};

module.exports.updateSection = function (sectionId, section, options,callback) {
    var secId = {_id: sectionId};
    var update = {
        sectionName: section.sectionName,
        maxSeats: section.maxSeats,
        availableSeats: section.availableSeats,
        courseId: section.courseId
    };
    return sectionModel.findOneAndUpdate(secId, update, options,callback);
};

module.exports.getSectionsForCourse = function (courseId) {
    return sectionModel.find({courseId: courseId})
};

module.exports.getSectionById = function (secId) {
    return sectionModel.findOne({_id: secId})
};