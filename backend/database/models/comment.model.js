const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String, // O texto do comentário
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Games' } // Referência ao post
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
