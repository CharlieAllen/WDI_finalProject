var User = require('../models/user');

function indexUsers(req, res){
  User.find(function(error, users){
    if (error) return res.status(404).json({message: 'Error'});
    return res.status(200).send(users);
  });
}

function newUser(req, res){
  var user = new User(req.body);
  user.save(function(error){
    if (error) return res.status(403).send({message: "Error"})
    return res.status(200).send(user);
  });
}

function showUser(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user){
    if (error) return res.status(404).send({message: 'Error'})
    return res.status(200).send(user);
  });
}

function updateUser(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user) {
    if (error) return res.status(404).send({message: 'Error'})

    if (req.body.name) user.name = req.body.name;
    if (req.body.location) user.location = req.body.location;

    user.save(function(error) {
      if (error) return res.status(500).send({message: "Error"})
      return res.status(200).send(user);
    });
  });
}

function deleteUser(req, res){
  var id = req.params.id;
  User.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'Error'})
    res.status(204);
  });
  return;
}

module.exports = {
  indexUsers: indexUsers,
  newUser: newUser,
  showUser: showUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}