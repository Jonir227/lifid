const Notification = require('../../models/notification');

// /api/notification/:username
exports.get = (req, res) => {
  const { username } = req.params;
  Notification.find({ to: username })
    .then(notis => (
      res.json({
        success: true,
        notis,
      })
    ))
    .catch(err => (
      res.status(403).json({
        success: false,
        error: err,
      })
    ));
}

// /api/notificiaton/:username/:notiID
exports.put = (req, res) => {
  const { username, notiID } = req.params;
  Notification.update({ to: username, _id: notiID }, { read: true })
    .then(() => {
      return res.json({
        success: true,
      });
    })
    .catch(() => {
      return res.json({
        success: false,
      });
    });
}