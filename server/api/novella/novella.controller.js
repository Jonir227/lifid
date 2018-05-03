const Novella = require('../../models/novella');

// api for novella

exports.novellaPOST = (req, res) => {
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

exports.novellaPUT = (req, res) => {
  const {
    author,
    quillDelta,
    content,
    savedDate,
    isPublished,
    id,
  } = req.body;
};
