const TodayNovel = require('../../models/todayNovel');

// GET /api/today-novel/now
exports.now = (req, res) => {
  TodayNovel.find().sort({ dueDate: -1 })
    .then((todayNovels) => {
      const {
        name,
        author,
        quotation,
        dueDate,
        image,
      } = todayNovels[0];
      res.json({
        name,
        author,
        quotation,
        dueDate,
        image,
      });
    })
    .catch((err) => {
      res.status(403).json({
        error: err,
      });
    });
};

// GET /api/today-novel?offset=x&limit=x
exports.list = (req, res) => {
  const offset = typeof req.query.offset === 'undefined' ? 0 : parseInt(req.query.offset, 10);
  const limit = typeof req.query.limit === 'undefined' ? 10 : parseInt(req.query.limit, 10);
  TodayNovel.find()
    .sort({ dueDate: -1 })
    .skip(offset).limit(limit)
    .then((todayNovels) => {
      res.json({
        success: true,
        todayNovels,
      });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        error: err,
      });
    });
};

// GET /api/today-novel/:id
exports.listWithParams = (req, res) => {
  const { id } = req.params;
  TodayNovel.findOne({ _id: id })
    .then((todayNovels) => {
      res.json(todayNovels);
    })
    .catch((err) => {
      res.status(403).json({
        error: err,
      });
    });
};

// POST /api/today-novel/
exports.post = (req, res) => {
  if (!req.decoded.admin) {
    res.status(403).json({
      success: false,
      message: 'you are not admin',
    });
  } else {
    const {
      name,
      author,
      quotation,
      dueDate,
      image,
    } = req.body;

    TodayNovel.create(name, author, quotation, dueDate, image)
      .then((result) => {
        res.json({
          success: true,
          message: result,
        });
      })
      .catch((result) => {
        res.status(403).json({
          success: false,
          message: result,
        });
      });
  }
};

// PUT api.today-novel/:id
exports.put = (req, res) => {
  if (!req.decoded.admin) {
    return res.status(403).json({
      success: false,
      message: 'you are not admin',
    });
  }
  const { id } = req.params;
  const {
    author,
    name,
    quotation,
    dueDate,
  } = req.body;

  TodayNovel.findOneAndUpdate({ _id: id }, {
    $set: {
      author,
      name,
      quotation,
      dueDate,
    },
  })
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        error: err,
      });
    });
};

// DELETE /api/today-novel/:id
exports.delete = (req, res) => {
  if (!req.decoded.admin) {
    res.status(403).json({
      success: false,
      message: 'you are not admin',
    });
  } else {
    const { id } = req.params;
    TodayNovel.deleteOne({ _id: id })
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
  }
};
