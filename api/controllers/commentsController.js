var Comments      = require('../models/comments');

var User = require("../models/user");

function commentsIndex(req, res){
  Comment.find({}, function(err, comments) {
    if (err) return res.status(404).send(err);

    res.status(200).send(comments);
  });
}

function commentsCreate(req, res){
  var comment = new Comment(req.body.comment);
  comment.save(function(err){
    if (err) return res.status(500).send(err);
    var name = req.body.project.user;
    User.findOne({ name: name }, function(err, user){
       user.comments.push(comment);
       user.save();
    });
    res.status(201).send(comment)
  });
}

function commentsShow(req, res){
  var id = req.params.id;

  Comment.findById({ _id: id }, function(err, comment) {
    if (err) return res.status(500).send(err);
    if (!comment) return res.status(404).send(err);

    res.status(200).send(comment);
  })
}

function commentsUpdate(req, res){
  var id = req.params.id;

  Comment.findByIdAndUpdate({ _id: id }, req.body.comment, function(err, comment){
    if (err) return res.status(500).send(err);
    if (!comment) return res.status(404).send(err);

    res.status(200).send(comment);
  })
}

function commentsDelete(req, res){
  var id = req.params.id;

  Comment.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200)
  })
}

module.exports = {
  commentsIndex:  commentsIndex,
  commentsCreate: commentsCreate,
  commentsShow:   commentsShow,
  commentsUpdate: commentsUpdate,
  commentsDelete: commentsDelete
}