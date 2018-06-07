const Novella = require('../../models/novella');
const htmlparser = require('htmlparser2');

// api for novella

// POST /api/novella/editor
exports.editorPost = (req, res) => {
  const {
    author,
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
    author,
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
  Novella.deleteOne({ doc_number: docNo, $or: [{ author: req.decoded.username }, { 'author.username': req.decoded.username }]})
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

  Novella.findOneAndUpdate({ doc_number, $or: [{ author: req.decoded.username }, { 'author.username': req.decoded.username }] }, {
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
  Novella.find({ $or: [{ author: username }, { 'author.username': username }], isPublished: published })
    .skip(offset).limit(limit).sort({ doc_number: -1 })
    .then((novellas) => {
      res.json({
        success: true,
        novellas,
      });
    })
    .catch((err) => {
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
  Novella.findOne({ $or: [{ author: username }, { 'author.username': username }], doc_number: doc_no })
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
  const offset = typeof req.query.offset === 'undefined' ? 0 : parseInt(req.query.offset, 10);
  const limit = typeof req.query.limit === 'undefined' ? 10 : parseInt(req.query.limit, 10);

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
          doc_number: item.doc_number,
          title: item.title,
          author: item.author,
          content: tmp.substr(0, 300),
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
    },
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

/*  GET /api/novella/search?type=x&value=x&today_novel=x&offset=x&limit=x
  TYPE
  - author
  - title
  - tag
*/

exports.search = (req, res) => {
  const offset = typeof req.query.offset === 'undefined' ? 0 : parseInt(req.query.offset, 10);
  const limit = typeof req.query.limit === 'undefined' ? 10 : parseInt(req.query.limit, 10);
  const searchCondition = { $regex: new RegExp(req.query.value, 'i') };
  const { type } = req.query;
  let searchQuery = {};
  // today_novel 퀴리가 들어오지 않았을때
  if (type === 'title') {
    searchQuery = { [type]: searchCondition };
  } else if (type === 'tag') {
    searchQuery = { tags: [req.query.value] };
  } else if (type === 'author') {
    searchQuery = { $or: [{ author: searchCondition }, { 'author.username': searchCondition }] };
  }
  // today_novel query가 들어왔을때

  if (typeof req.query.today_novel !== 'undefined') {
    const todayNovel = req.query.today_novel;
    searchQuery = Object.assign({}, searchQuery, { 'todayNovel.name': todayNovel });
  }
  // 파라미터가 안들어왔을 때는 구분하지 않고 쿼리
  searchQuery = Object.assign({}, searchQuery, { isPublished: true });
  console.log(searchQuery);

  Novella.find(searchQuery, { quillDelta: false }).sort({ views: -1 }).skip(offset).limit(limit)
    .then((result) => {
      let tmp = '';
      const parser = new htmlparser.Parser({
        ontext: (text) => {
          tmp = tmp.concat(text, ' ');
        },
      });
      const resData = result.map((item) => {
        tmp = '';
        parser.write(item.content);
        parser.end();
        return {
          doc_number: item.doc_number,
          todayNovel: item.todayNovel,
          title: item.title,
          author: item.author,
          content: tmp.substr(0, 300),
          tags: item.tags,
          views: item.views,
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
