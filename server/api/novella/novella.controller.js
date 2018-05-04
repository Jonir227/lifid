const Novella = require('../../models/novella');

// api for novella

exports.editorPost = (req, res) => {
  const {
    quillDelta,
    content,
    savedDate,
    isPublished,
  } = req.body;
  console.log(req);
  Novella.create({
    author: req.decoded.username,
    quillDelta,
    content,
    isPublished,
    published_date: savedDate,
  }).then((novella) => {
    res.json({
      success: true,
      docNo: novella.doc_number,
    });
  }).catch((err) => {
    res.status(400).json({
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

exports.editorPut = (req, res) => {
  const {
    author,
    quillDelta,
    content,
    savedDate,
    isPublished,
    doc_number,
  } = req.body;

  Novella.findByIdAndUpdate({ doc_number })
    .then((doc) => {
      // do something
    })
    .catch((err) => {
      // do something
    });
};
