const mongoose = require('mongoose');

const { Schema } = mongoose;

const novellaShema = new Schema({
  id: Number,
  title: String,
  author: String,
  content: String,
  published_date: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('novella', novellaShema);
