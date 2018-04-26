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
  }).then(() => {
    res.json({
      success: true,
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
