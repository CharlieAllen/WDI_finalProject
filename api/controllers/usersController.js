var User      = require('../models/user');

function getAll(req, res) {
  User.find(function(error, users){
    if (error) res.json({ message: "Could not find any user"});
    return res.json(users);
  });
}

function newUser(req, res) {
  var user = new User(req.body);

  user.save(function(error){
    if (error) res.json({ message: "Could not create new user because: " + error });
    return res.json({ user: user });
  });
}

function getUser(req, res) {
  var id = req.params.id;

  User.findById({_id: id}, function(error, user){
    if (error) res.json({ message: "Could not find user because: " + error })
    return res.json({ user: user});
  }); 
}

function updateUser(req, res) {
  var id = req.params.id;

  User.findById({_id: id}, function(error, user) {
    if (error) res.json({ message: "Could not find user because" + error });

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.location) user.location = req.body.location;
    if (req.body.industry) user.industry = req.body.industry;
    if (req.body.about_me) user.about_me = req.body.about_me;
    if (req.body.favourite_videos) user.favourite_videos = req.body.favourite_videos;

    console.log(req.body);
    
    user.save(function(error) {
      if (error) res.json({message: "Could not update user because: " + error});

      res.json({ message: "User successfully updated", user: user });
    });
  });
}

function deleteUser(req, res) {
  var id = req.params.id;

  User.remove({_id: id}, function(error) {
    if (error) res.json({ message: "Could not delete user because: " + error });

      res.json({ message: "User successfully deleted" });
  });
  return;
}

module.exports = {
  getAll: getAll,
  newUser: newUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}