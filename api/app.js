var express       = require('express');
var path          = require('path');
var cors          = require('cors');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var expressJWT    = require('express-jwt');
var app           = express();
var routes        = require('./config/routes');

var User          = require('../models/user');

var app           = express();

mongoose.connect('mongodb://localhost:3000');

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.post("/signup", function(req ,res) {
  var user = new User(req.body.user);

  user.save(function(err, user ){
    if (err) return res.json({ message: errmsg });
    if (!user) return res.json({ message: "This email address is not registered"});

    user.authenticate(userParams.password, function(err, isMatch) {
      if (err) return res.json({ message : errmessage });

      if (isMatch) return res.json({ message: "Valid login details provided, thank you."})

      return res.json({ message: "The details you provided have not been matched. Please check and try again."});
    });
  });
})

app.listen(3000);
console.log("Express is listening on PORT:3000")