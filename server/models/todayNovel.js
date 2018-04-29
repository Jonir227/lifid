const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodayNovelSchema = new Schema({
  name: String,
  author: String,
  quotation: String,
  dueDate: String,
});

TodayNovelSchema.statics.create = function (name, author, quotation, dueDate) {
  const todayNovel = new this({
    name,
    author,
    quotation,
    dueDate,
  });
  return todayNovel.save();
};

module.exports = mongoose.model('todayNovel', TodayNovelSchema);
