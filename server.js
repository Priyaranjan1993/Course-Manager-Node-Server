var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",
    req.headers.origin);
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var connectURL = 'mongodb://localhost/coursemanagement';
if (process.env.MONGO_USERNAME) {
  var username = process.env.MONGO_USERNAME;
  var password = process.env.MONGO_PASSWORD;
  /*connectURL = 'mongodb://' + username + ':' + password + '@ds143451.mlab.com:43451/coursemanagement'*/
  connectURL = 'mongodb://' + username + ':' + password + '@ds143451.mlab.com:43451/heroku_0rj8bw0c'
  /*mongodb://priyaranjan:priya@93@ds143451.mlab.com:43451/coursemanagement*/
  /*mongodb://heroku_0rj8bw0c:t1cke9pt4atp1rmpelrq4eho1v@ds143451.mlab.com:43451/heroku_0rj8bw0c*/
}

var mongoose = require('mongoose');
mongoose.connect(connectURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connection:'));
db.once('open', function () {
  console.log('connection successful');
});


var user_Service = require('./service/user.service.server');
user_Service(app);
var section_Service = require('./service/section.service.server');
section_Service(app);
var enroll_Service = require('./service/enroll.service.server');
enroll_Service(app);
var courseType_Service = require('./service/courseType.service.server');
courseType_Service(app);


app.listen(process.env.PORT || 3000, function(){
  console.log("Server running on port %d", this.address().port);
});
