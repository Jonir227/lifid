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

// POST /api/today-novel
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
