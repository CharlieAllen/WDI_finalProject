var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var UserSchema = new mongoose.Schema({
  name: { type: String}, // , required: true },
  email: { type: String}, //, required: true, unique: true},
  password: { type: String}, //, required: true },
  location: { type: String },
  industry: { type: String },
  about_me: { type: String },
  favourite_videos: [],
  comments: [{type: mongoose.Schema.ObjectId, ref: 'Comments'}]
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(user.password, 10);

  next();
});

UserSchema.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    callback(null, isMatch)
  })
}

module.exports = mongoose.model("User", UserSchema);