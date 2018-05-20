const User = require('../../models/user');
const Novella = require('../../models/novella');
const path = require('path');

// api for admin

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

// GET /api/user/:username
exports.info = (req, res) => {
  Novella.find({ author: req.params.username })
    .then((novella) => {
      User.findOneByUsername(req.params.username)
        .then((user) => {
          res.json({
            user,
            novella,
          });
        });
    })
    .catch((error) => {
      res.json({
        success: false,
        error,
      });
    });
};

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

// GET /api/user/profliepic/:username
exports.profilepic = (req, res) => {
  const options = {
    root: path.join('data'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };
  User.findOneByUsername(req.params.username)
    .then((user) => {
      if (user.profilePicture === 'default') {
        res.sendFile('default.jpg', options);
      } else {
        res.sendFile(user._id, options);
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};
