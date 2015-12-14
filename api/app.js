var express       = require('express');
var path          = require('path');
var cors          = require('cors');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var expressJWT    = require('express-jwt');
var jwt           = require('jsonwebtoken');
var app           = express();
var routes        = require('./config/routes');
var bcrypt        = require('bcrypt');

var User          = require('./models/user');

var app           = express();

var secret        = "SECRETWORDFORTEDCHATAPP"

mongoose.connect('mongodb://localhost/tedChatApp');


app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', expressJWT({ secret: secret }));
app.use('/api/users/:id', expressJWT({secret: secret}));

app.use(routes);

app.post("/signup", function(req ,res) {
  var userParams = new User(req.body.user);

  userParams.save(function(err, user ){
    if (err) return res.json({ message: err });

    //create a JWT and return to the angular app
    var token = jwt.sign(user, secret, { expiresIn: '30d' });
    res.status(200).json({ token: token });


    //   return res.json({ message: err });
    // });
  });
})

app.post("/login", function(req, res) {
  var userParams = req.body.user;

  User.findOne({ email: userParams.email }, function(err, user) {
    if(err) res.status(401).json({ message: "Access Denied" });

    user.authenticate(userParams.password, function(err, isMatch) {
      if (err) throw err;

      if (isMatch) {
        return res.json({ message: "Login successful." });
      } else {
        return res.json({ message: "The details provided do not match any user in our system" });
      };
    });
  });
});

app.listen(3000);
console.log("Express is listening on PORT:3000")