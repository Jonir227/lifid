const mongoose = require('mongoose');

const { Schema } = mongoose;

const novellaShema = new Schema({
  title: String,
  author: String,
  published_date: {
    type: Date,
    default: Date.now,
  },
});
