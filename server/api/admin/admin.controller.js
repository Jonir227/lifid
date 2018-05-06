const Admin = require('../../models/admin');

// GET /api/admin
exports.adminGet = (req, res) => {
  Admin.find().sort({ dueDate: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(403).json({
        error: err,
      });
    });
};

// POST /api/admin
exports.adminPost = (req, res) => {
  const {
    author,
    name,
    quotation,
    dueDate,
  } = req.body;

  Admin.create(author, name, quotation, dueDate)
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
};

// PUT /api/admin
exports.adminPut = (req, res) => {
  const {
    author,
    name,
    quotation,
    dueDate,
  } = req.body;

  Admin.findOneAndUpdate({ dueDate }, {
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
};

// DELETE /api/admin
exports.adminDelete = (req, res) => {
  const {
    dueDate,
  } = req.body;
  Admin.deleteOne({ dueDate })
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
};
