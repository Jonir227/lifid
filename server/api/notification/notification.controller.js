const Notification = require('../../models/notification');

// GET /api/notification/:username?offset=X&limit=X
// Returns : notifications Array, Number of Unread Notifications
exports.get = (req, res) => {
  const { username } = req.params;
  // Check Requetsed Username with Token's Username
  if (username !== req.decoded.username) {
    return res.stauts(403).json({
      success: false,
      message: 'Username Request Doesn\'t Match',
    });
  }
  const offset = parseInt(req.query.offset, 10);
  const limit = parseInt(req.query.limit, 10);

  // to Get Notifications
  const getNotiData = countData =>
    new Promise((resolve, reject) => {
      Notification.find({ to: username })
        .skip(offset).limit(limit)
        .then(noti => resolve({ countData, noti }))
        .catch(err => reject(err));
    });

  // Error Handling
  const onError = err =>
    res.status(403).json({
      success: false,
      error: err,
    });

  Notification.find({ to: username, read: false }).count()
    .then(getNotiData)
    .then(data =>
      res.json({
        success: true,
        notifications: data.noti,
        count: parseInt(data.countData, 10),
      }))
    .catch(onError);
};

// PUT /api/notificiaton/:username/:notiID
// it Triggers Unread Notification to readed state
exports.put = (req, res) => {
  const { notiID } = req.params;
  const { username } = req.decoded;
  Notification.update({ to: username, _id: notiID }, { read: true })
    .then(() => res.json({
      success: true,
    }))
    .catch(() => res.json({
      success: false,
    }));
};
