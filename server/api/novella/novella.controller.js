const Novella = require('../../models/novella');

// api for novella

exports.editorPost = (req, res) => {
  const {
    published_date,
    quillDelta,
    content,
    savedDate,
    isPublished,
    doc_number,
    title,
    tags,
  } = req.body;
  Novella.create({
    author: req.decoded.username,
    published_date,
    quillDelta,
    content,
    savedDate,
    isPublished,
    doc_number,
    title,
    tags,
  }).then((novella) => {
    res.json({
      success: true,
      docNo: novella.doc_number,
    });
  }).catch((err) => {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  });
};

// DELETE /api/novella/editor/:docNo
exports.editorDelete = (req, res) => {
  const {
    docNo,
  } = req.params;
  Novella.deleteOne({ doc_number: docNo, username: req.decoded.username })
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        error: err,
      });
    });
};

exports.editorPut = (req, res) => {
  const {
    quillDelta,
    content,
    savedDate,
    published_date,
    isPublished,
    doc_number,
    title,
    tags,
  } = req.body;

  Novella.findOneAndUpdate({ doc_number, author: req.decoded.username }, {
    $set: {
      quillDelta,
      content,
      savedDate,
      isPublished,
      tags,
      published_date,
      title,
    },
  })
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        error: err,
      });
    });
};

// GET /api/novella/editor?offset=0&limit=0
exports.editorGet = (req, res) => {
  const { username } = req.decoded;
  const offset = parseInt(req.query.offset, 10);
  const limit = parseInt(req.query.limit, 10);
  Novella.find({ author: username }).skip(offset).limit(limit)
    .then((novellas) => {
      res.json({
        success: true,
        novellas,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json({
        success: false,
        error: err,
      });
    });
};
// GET /api/novella/editor/:doc_no
exports.editorGetWithParams = (req, res) => {
  const { username } = req.decoded;
  const { doc_no } = req.params;
  Novella.findOne({ author: username, doc_number: doc_no })
    .then((novella) => {
      res.json({
        success: true,
        novella,
      });
    })
    .catch((error) => {
      res.status(403).json({
        success: false,
        error,
      });
    });
};
