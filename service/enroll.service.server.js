module.exports = function (app) {

    var enrollModel = require('../models/enroll/enroll.model.server');
    var sectionModel = require('../models/section/section.model.server');

    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1800000},
        secret: 'any string'
    }));

    app.post('/api/student/:sid/section/:kid', function (req, res) {
        var studentId;
        if (req.session && req.session['user']) {
            studentId = req.session['user']._id;
        }
        else {
            studentId = 0;
        }
        var sectionId = req.params.kid;
        var grade = 'NA';
        var enroll = {
            student: studentId,
            section: sectionId,
            grade: grade
        };
        sectionModel.decreaseSectionSeat(sectionId)
            .then(function () {
                return enrollModel.enrollStudent(enroll)
            })
            .then((data) => {
                res.send(data);
            })
    });

    app.delete('/api/student/:sid/section/:kid', function (req, res) {
        var studentId;
        if (req.session && req.session['user']) {
            studentId = req.session['user']._id;
        }
        else {
            studentId = 0;
        }
        var sectionId = req.params.kid;
        var grade = 'NA';
        var unenroll = {
            student: studentId,
            section: sectionId,
            grade: grade
        };
        sectionModel.increaseSectionSeat(sectionId)
            .then(function () {
                return enrollModel.unenrollStudent(unenroll)
            })
            .then((data) => {
                res.send(data);
            })
    });

    app.get('/api/student/:sid/section', function (req, res) {
        if (req.session && req.session['user']) {
            var studentId = req.session['user']._id;
            enrollModel.findSectionForStudent(studentId)
                .then(data => {
                    res.send(data);
                })
        }
    })

};