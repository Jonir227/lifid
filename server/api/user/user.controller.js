const User = require('../../models/user');
const path = require('path');
const crypto = require('crypto');

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
  User.findOne({ username: req.params.username }, { admin: false })
    .then((user) => {
      res.json({
        success: true,
        user,
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

// PUT /api/user/:id
exports.put = (req, res) => {
  const proPic = typeof req.body.profilePicture === 'undefined' ? 'default' : req.body.profilePicture;

  const { id } = req.params;
  const {
    username,
    password,
    tags,
    description,
  } = req.body;

  const hashKey = 'thiSIsHaSh!Key';
  const encrypted = crypto.createHmac('sha1', hashKey)
    .update(password)
    .digest('base64');
  if (password.length > 15) {
    User.findOneAndUpdate({ _id: id }, {
      $set: {
        username,
        tags,
        proPic,
        description,
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
  } else {
    User.findOneAndUpdate({ _id: id }, {
      $set: {
        username,
        password: encrypted,
        tags,
        proPic,
        description,
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
  }
};

// POST /api/user/:id/bookmark
exports.bookMarkPost = (req, res) => {
  const { docNo } = req.body;
  User.update({ username: req.decoded.username }, { $push: { bookMark: docNo } })
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((error) => {
      res.status(403).json({
        success: false,
        error,
      });
    });
};

// DELETE /api/user/:id/bookmark/:docNo
exports.bookMarkDelete = (req, res) => {
  User.update({ username: req.decoded.username }, {
    $pull: { bookMark: req.params.docNo },
  })
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((error) => {
      res.status(403).json({
        success: false,
        error,
      });
    });
};

// POST /api/user/:id/follow/:username
exports.followPost = (req, res) => {
  User.update({ username: req.decoded.username }, { $push: { follow: req.params.username } })
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((error) => {
      res.status(403).json({
        success: false,
        error,
      });
    });
};

// DELETE /api/user/:id/follow/:username
exports.followDelete = (req, res) => {
  User.update({ username: req.decoded.username }, { $pull: { follow: req.params.username } })
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((error) => {
      res.status(403).json({
        success: false,
        error,
      });
    });
};
