const User = require('../../models/user');

// apit for admin

// GET /api/user/list

exports.list = (req, res) => {
  if (!req.decoded.admin) {
    return res.status(403).json({
      message: 'you are not admin',
    });
  }

  User.find({})
    .then((result) => {
      res.json({ result });
    });
};

// POST /api/user/checkUser username => 중복되는 유저 이름이 있는지? T/F

// POST /api/user/assignAdmin/:username
exports.assignAdmin = (req, res) => {
  if (!req.decoded.admin) {
    return res.status(403).json({
      message: 'you are not admin',
    });
  }

  User.findOneByUsername(req.params.username)
    .then((user) => { user.assignAdmin(); })
    .then(res.json({
      success: true,
    }))
    .catch(res.json({
      success: false,
    }));
};
