module.exports = function (app) {

    var sectionModel = require('../models/section/section.model.server');

    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1800000},
        secret: 'any string'
    }));

    app.post('/api/course/:courseId/section', function (req, res) {
        var section = req.body;
        console.log(req.body);
        sectionModel.addSection(section)
            .then(function (result) {
                console.log(result);
                res.send(result);
            })
    });

    app.delete('/api/section/:sectionId', function (req, res) {
        var secId = req.params.sectionId;
        sectionModel.deleteSection(secId)
            .then(function (result) {
                console.log(result);
                res.send(result);
            })
    });

    app.get('/api/course/:courseId/section', function (req, res) {
        sectionModel.getSectionsForCourse(req.params.courseId)
            .then(function (sections) {
                console.log(sections);
                res.send(sections);
            })
    });

    app.get(' /api/section/:sectionId', function (req, res) {
        sectionModel.getSectionsForCourse(req.params.courseId)
            .then(function (sections) {
                console.log(sections);
                res.send(sections);
            })
    });

    app.put('/api/section/:sectionId', function (req, res) {
        var sectionData = req.body;
        var sectionId = req.params.sectionId;
        sectionModel.updateSection(sectionId, sectionData,{})
            .then(function (response) {
                console.log(response);
                res.send(response);
            })
    })

};
