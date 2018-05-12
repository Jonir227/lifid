const TodayNovel = require('../../models/todayNovel');

// GET /api/today-novel/now
exports.now = (req, res) => {
  TodayNovel.find().sort({ dueDate: -1 }).limit(1)
    .then((todayNovels) => {
      const {
        name,
        author,
        quotation,
        dueDate,
      } = todayNovels[0];
      res.json({
        name,
        author,
        quotation,
        dueDate,
      });
    })
    .catch((err) => {
      res.status(403).json({
        error: err,
      });
    });
};

// GET /api/today-novel/list?offset=x&limit=x
exports.list = (req, res) => {
  const offset = parseInt(req.query.offset, 10);
  const limit = parseInt(req.query.limit, 10);
  TodayNovel.find().skip(offset).limit(limit)
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

// GET /api/today-novel/list/:id
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

// POST /api/today-novel/new
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
    } = req.body;

    TodayNovel.create(name, author, quotation, dueDate)
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

// PUT api.today-novel/list/:id
exports.modify = (req, res) => {
  if (!req.decoded.admin) {
    res.status(403).json({
      success: false,
      message: 'you are not admin',
    });
  } else {
    const { id } = req.params;
    const {
      author,
      name,
      quotation,
      dueDate,
    } = req.body;

    TodayNovel.findOneAndUpdate({ _id: id }, {
      author, name, quotation, dueDate,
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
  }
};

// DELETE /api/today-novel/list/:id
exports.remove = (req, res) => {
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
