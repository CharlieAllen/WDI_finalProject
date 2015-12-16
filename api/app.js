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

var secret        = process.env.WDI_FINAL_PROJ_KEY;

var mongoUri      = process.env.MONGOLAB_URI || 'mongodb://localhost/tedChatApp'
mongoose.connect(mongoUri);

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', expressJWT({ secret: secret }));

app.use(function(err, req, res, next) {
  if(err && err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'You must be logged in to view users'});
  }
  next();
})

app.use('/api/users/:id', expressJWT({secret: secret}));

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

var routes = require(__dirname + '/config/routes');
app.use('/api', routes);

app.use(routes);

app.post("/signup", function(req ,res) {
  // console.log("=============================> Signing up. req.body:");
  // console.log(req.body);
  var userParams = new User(req.body);
  console.log("userParams:", userParams);

  userParams.save(function(err, user ){
    if (err){
      console.log("ERROR!", err);
      return res.json({ message: err });
    }

    console.log("Saving...");
    //create a JWT and return to the angular app
    var token = jwt.sign(user, secret, { expiresIn: '30d' });
    console.log("token:", token);
    res.status(200).json({ token: token });


    //   return res.json({ message: err });
    // });
  });
})

app.post("/login", function(req, res) {
  var userParams = req.body;
  console.log(userParams)
  User.findOne({ email: userParams.email }, function(err, user) {
    if(err) res.status(401).json({ message: "Access Denied : " + err });

    user.authenticate(userParams.password, function(err, isMatch) {
      if (err) throw err;

      if (isMatch) {
        var token = jwt.sign(user, secret, { expiresIn: '30d' });
        res.status(200).json({ token: token });
      } else {
        return res.json({ message: "The details provided do not match any user in our system" });
      };
    });
  });
});

app.listen(process.env.PORT || 3000 );
console.log("Express is listening on PORT:3000")