const Novella = require('../../models/novella');
const htmlparser = require('htmlparser2');

// api for novella

// POST /api/novella/editor
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
    todayNovel,
  } = req.body;
  Novella.create({
    author: req.decoded.username,
    published_date,
    quillDelta,
    content,
    savedDate,
    isPublished,
    todayNovel,
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
  Novella.deleteOne({ doc_number: docNo, author: req.decoded.username })
    .then(() => {
      res.json({
        success: true,
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

// PUT /api/novella/editor
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

// GET /api/novella/editor?offset=0&limit=0&isPublished=boolean
exports.editorGet = (req, res) => {
  const { username } = req.decoded;
  const offset = typeof req.query.offset === 'undefined' ? 0 : parseInt(req.query.offset, 10);
  const limit = typeof req.query.limit === 'undefined' ? 40 : parseInt(req.query.limit, 10);
  const published = typeof req.query.published === 'undefined' ? false : (req.query.published === 'true');
  Novella.find({ author: username, isPublished: published })
    .skip(offset).limit(limit).sort({ doc_number: -1 })
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

// GET /api/novella/reader?offest=0&limit=0
exports.readerGet = (req, res) => {
  const offset = typeof req.query.offset === 'undefined' ? 0 : parseInt(req.query.offset, 15);
  const limit = typeof req.query.limit === 'undefined' ? 0 : parseInt(req.query.limit, 10);

  Novella.find({ isPublished: true }).skip(offset).limit(limit)
    .then((novellas) => {
      let tmp = '';
      const parser = new htmlparser.Parser({
        ontext: (text) => {
          tmp = tmp.concat(text, ' ');
        },
      });
      const resData = novellas.map((item) => {
        tmp = '';
        parser.write(item.content);
        parser.end();
        return {
          title: item.title,
          author: item.author,
          content: tmp.substr(0, 100),
          tags: item.tags,
        };
      });
      res.json({
        success: true,
        novellas: resData,
      });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        error: err,
      });
    });
};

// GET /api/novella/reader/:docNo
exports.readerGetWithParams = (req, res) => {
  const { docNo } = req.params;
  Novella.findOneAndUpdate({ doc_number: docNo }, {
    $inc: { views: 1 },
  })
    .then((novella) => {
      res.json({
        success: true,
        novella,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err,
      });
    });
};

// POST /api/novella/reader/:docNo/:comment
exports.readerCommentPost = (req, res) => {
  const { docNo } = req.params;
  const { comment } = req.body;
  const { username } = req.decoded;
  Novella.update(
    { doc_number: docNo },
    {
      $push: {
        comments: {
          name: username,
          comment,
          time: Date.now(),
        },
      },
    }
  ).then(() => {
    res.json({
      success: true,
    });
  })
    .catch(() => {
      res.status(403).json({
        success: false,
      });
    });
};

// DELETE /api/novella/reader/:nocNo/comment?comment=?&time=?
exports.readerCommentDelete = (req, res) => {
  const { docNo } = req.params;
  const { comment, time } = req.query;
  const { username } = req.decoded;
  Novella.update(
    {
      doc_number: docNo,
    },
    {
      $pull: {
        comments: {
          name: username,
          comment,
          time,
        },
      },
    },
  ).then((result) => {
    res.json({
      success: true,
      result,
    });
  })
    .catch(() => {
      res.status(403).json({
        success: false,
      });
    });
};
