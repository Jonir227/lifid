const Novella = require('../../models/novella');

// api for novella

exports.editorPost = (req, res) => {
  const {
    published_date,
  } = req.body;
  Novella.create({
    author: req.decoded.username,
    published_date,
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
    author,
    quillDelta,
    content,
    savedDate,
    isPublished,
    doc_number,
  } = req.body;

  Novella.findOneAndUpdate({ doc_number }, {
    quillDelta, content, savedDate, isPublished,
  })
    .then((doc) => {
      console.log(doc);

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
