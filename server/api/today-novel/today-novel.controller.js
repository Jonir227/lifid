const TodayNovel = require('../../models/todayNovel');

// GET /api/today-novel/now
exports.now = (req, res) => {
  TodayNovel.find().sort({ dueDate: -1 }).limit(1)
    .then((data) => {
      const {
        name,
        author,
        quotation,
        dueDate,
      } = data[0];
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

// GET /api/today-novel/list?page=num&&quantity=num
exports.list = (req, res) => {
  TodayNovel.find().sort({ dueDate: -1 })
    .then((data) => {
      res.json(data);
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

// PUT api.today-novel/modify
exports.modify = (req, res) => {
  if (!req.decoded.admin) {
    res.status(403).json({
      success: false,
      message: 'you are not admin',
    });
  } else {
    const {
      author,
      name,
      quotation,
      dueDate,
    } = req.body;

    TodayNovel.findOneAndUpdate({ dueDate }, {
      author, name, quotation,
    })
      .then((result) => {
        console.log(result);

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

// DELETE /api/today-novel/remove
exports.remove = (req, res) => {
  if (!req.decoded.admin) {
    res.status(403).json({
      success: false,
      message: 'you are not admin',
    });
  } else {
    const {
      dueDate,
    } = req.body;
    TodayNovel.deleteOne({ dueDate })
      .then((result) => {
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
