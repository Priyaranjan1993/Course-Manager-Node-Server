module.exports = function (app) {

    var courseTypeModel = require('../models/courseType/courseType.model.server');

    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1800000},
        secret: 'any string'
    }));


    app.post('/api/course/type/:courseId/:type', function (req, res) {
        var cId = req.params.courseId;
        var type = req.params.type;
        var data = {
            courseId: cId,
            type: type,
        };
        courseTypeModel.checkIfExists(cId)
            .then(response => {
                if (response !== null) {
                    console.log(response);

                    courseTypeModel.updateCourseType(data, response._id)
                        .then((response) => {
                            res.send(response);
                        })
                }
                else {
                    courseTypeModel.changeType(data)
                        .then((response) => {
                            res.send(response);
                        })
                }
            });
    });

    app.get('/api/course/type/:courseId/checkType', function (req, res) {
        var cId = req.params.courseId;
        courseTypeModel.checkIfExists(cId)
            .then(response => {
                    console.log(response);
                    res.send(response);
            });
    });
};