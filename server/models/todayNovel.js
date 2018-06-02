const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodayNovelSchema = new Schema({
  name: String,
  author: String,
  quotation: String,
  dueDate: String,
  image: String,
});

TodayNovelSchema.statics.create = function (name, author, quotation, dueDate, image) {
  const todayNovel = new this({
    name,
    author,
    quotation,
    dueDate,
    image,
  });
  return todayNovel.save();
};

module.exports = mongoose.model('todayNovel', TodayNovelSchema);
