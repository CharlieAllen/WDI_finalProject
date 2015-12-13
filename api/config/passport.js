var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');
var jwt           = require('jsonwebtoken');

module.exports = function(passport) {
  passport.use('local-signup', new LocalStrategy({
    nameField         : "name",
    passwordField     : "password", 
    passReqToCallback : true
  }, function(req, name, password, done) {
      process.nextTick(function() {
        User.findOne({ "name": name }, function(err, user) {
          
          if (err) return done(err);
          if (user) return done(null, false);

          var newUser = new User();
          newUser.name = name;
          newUser.email = email;
          newUser.location = req.body.location;
          newUser.industry = req.body.industry;
          newUser.about_me = req.body.about_me;
          newUser.password = newUser.encrypt(password);

          newUser.save(function(err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        });
      });
  }));
}



