var express       = require('express');
var path          = require('path');
var cors          = require('cors');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var expressJWT    = require('express-jwt');
var app           = express();
var routes        = require('./config/routes');
var bcrypt        = require('bcrypt');

var User          = require('./models/user');

var app           = express();

mongoose.connect('mongodb://localhost/tedChatApp');
var secret = "NOTVERYSECRET";

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.post("/signup", function(req ,res) {
  var userObject = new User(req.body.user);

  userObject.save(function(err, user ){
    if (err) return res.json({ message: err });

    //create a JWT and return to the angular app
    var token = jwt.sign(user, secret, { expiresIn: '24h' });
    res.json({ token: token });


    //   return res.json({ message: err });
    // });
  });
})

app.listen(3000);
console.log("Express is listening on PORT:3000")