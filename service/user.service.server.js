module.exports = function (app) {

    var userModel = require('../models/user/user.model.server');

    app.get('/', function (req, res) {
        res.send('Hello World Priyaranjan!!');
    });

    var session = require('express-session');
    app.use(session({
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 1800000},
        secret: 'any string'
    }));

    app.post('/api/register', function (req, res) {
        var user = req.body;
        console.log(req.body);
        userModel.addUser(user)
            .then(function (user) {
                console.log(user);
                req.session['user'] = user;
                res.send(user);
            })
    });

    app.post('/api/login', function (req, res) {
        var user = req.body;
        var userName = user.userName;
        var password = user.password;
        userModel.login(user)
            .then(function (user) {
                console.log(user);
                req.session['user'] = user;
                res.send(user);
            })
    });


    app.get('/api/user/:_userName', function (req, res) {
        userModel.getUserbyName(req.params._userName)
            .then(function (user) {
                console.log(user);
                res.send(user);
            })
    });


    app.get('/api/profile/:_username', function (req, res) {
        userModel.getProfileById(req.params._username)
            .then(function (user) {
                console.log(user);
                res.send(user);
            })
    });

    app.put('/api/profile', function (req, res) {
        if (req.session && req.session['user']) {
            var user = req.session['user'];
            var id = user._id;
            var profile = req.body;
            var userName = profile.username;
            var firstName = profile.firstName;
            var lastName = profile.lastName;
            var email = profile.email;
            var mobile = profile.phone;
            var address = profile.address;
            userModel.saveProfile(profile, id)
                .then(function (profile) {
                    console.log(profile);
                    req.session['user'] = profile;
                    res.send(profile);
                })

        }
        else {
            res.send(null);
        }

    });

    app.get('/api/getUserId', function (req, res) {
        var currentUserId = req.session['user'];
        console.log("session ----- " + req.session);
        console.log("user details ----- " + currentUserId);
        res.send(currentUserId);
    });

    app.post('/api/logout', function (req, res) {
        if (req.session && req.session['user']) {
            req.session.destroy();
            res.send("user logged out");
        }
        else {
            res.send("Session not set !!")
        }
    })

    app.delete('/api/profile', function (req, res) {
        if (req.session && req.session['user']) {
            var userId = req.session['user']._id;
            userModel.deleteUser(userId)
                .then((data) => {
                    res.send(data);
                })
        }
    })

};
