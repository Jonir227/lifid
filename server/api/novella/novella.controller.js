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

exports.editorDelete = (req, res) => {
  const {
    doc_number,
  } = req.body;
  Novella.deleteOne({ doc_number })
    .then((doc) => {
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

// GET /api/novella?doc_no=id
exports.editorGet = (req, res) => {
  const { username } = req.decoded;
  const { doc_no } = req.query;
  Novella.findOne({ author: username, doc_number: doc_no })
    .then((novella) => {
      console.log(novella);
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
