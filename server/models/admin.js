const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  author: String,
  name: String,
  quotation: String,
  dueDate: String,
});

AdminSchema.statics.create = function (author, name, quotation, dueDate) {
  const admin = new this({
    author,
    name,
    quotation,
    dueDate,
  });
  return admin.save();
};

module.exports = mongoose.model('admin', AdminSchema);
