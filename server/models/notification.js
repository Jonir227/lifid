const mongoose = require('mongoose');

const { Schema } = mongoose;

// TYPE
//  -COMMENT
//  -AUTHER_NEW_NOVEL

const notificiationSchema = new Schema({
  type: String,
  from: String,
  to: String,
  location: String,
  time: {
    type: Date,
    default: Date.now(),
  },
  read: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('notification', notificiationSchema);
