var mongoose = require('mongoose');
var courseTypeSchema = require('./courseType.schema.server');
var courseTypeModel = mongoose.model('courseTypeModel', courseTypeSchema);

module.exports.changeType = function (data, callback) {
    return courseTypeModel.create(data, callback);
};

module.exports.checkIfExists = function (cId, callback) {
    return courseTypeModel.findOne({courseId: cId}, callback);
};

module.exports.updateCourseType = function (data, id, callback) {
    var cid = {_id: id};
    return courseTypeModel.findOneAndUpdate(cid, data, callback)
};

