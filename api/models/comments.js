var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
  title: String, 
  comment: String, 
  video_id: //??,
});

module.exports = mongoose.model("Comments", CommentsSchema);