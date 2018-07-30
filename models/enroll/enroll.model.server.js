var mongoose = require('mongoose');
var enrollSchema = require('./enroll.schema.server');
var enrollModel = mongoose.model('enroll', enrollSchema);

module.exports.enrollStudent = function (enrollData, callback) {
    return enrollModel.create(enrollData, callback);
};

module.exports.unenrollStudent = function (unenrollData, callback) {
    return enrollModel.remove(unenrollData, callback);
};

module.exports.findSectionForStudent = function (studentId) {
    return enrollModel.find({student: studentId}).populate('section').exec();
};

module.exports.removeStudentsAfterDeletion = function (sectionId) {
    return enrollModel.remove({section: sectionId})
}