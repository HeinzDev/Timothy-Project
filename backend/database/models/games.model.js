const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: String,
  image: String,
  stars: Number,
  Comments: Number
});

const GamesModel = mongoose.model('Games', commentSchema);

module.exports = GamesModel;
