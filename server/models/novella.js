const mongoose = require('mongoose');

const { Schema } = mongoose;

const novellaShema = new Schema({
  title: String,
  author: String,
  content: String,
  published_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('novella', novellaShema);
