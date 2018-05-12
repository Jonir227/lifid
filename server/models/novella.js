const mongoose = require('mongoose');

const { Schema } = mongoose;

// auto increment를 위한 스키마 작성
const novellaCounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const novellaCounter = mongoose.model('novellaCounter', novellaCounterSchema);

const novellaShema = new Schema({
  doc_number: String,
  title: {
    type: String,
    default: '',
  },
  author: String,
  content: {
    type: String,
    default: '',
  },
  quillDelta: {
    type: Object,
    default: {},
  },
  published_date: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Array,
    default: [],
  },
  novelData: {
    type: Object,
    default: {},
  },
});

// novellaShema의 ID를 저장한다. 나중에 불러올 때는 이걸로 접근해서 불러오도록 한다.
novellaShema.pre('save', function (next) {
  novellaCounter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, { new: true, upsert: true })
    .then((count) => {
      console.log(`...count: ${JSON.stringify(count)}`);
      this.doc_number = count.seq;
      next();
    })
    .catch((err) => {
      console.error(`counter error -> ${err}`);
      throw err;
    });
});

module.exports = mongoose.model('novella', novellaShema);
