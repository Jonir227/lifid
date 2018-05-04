const Tag = require('../../models/tag');

// api for tags
exports.listGET = (req, res) => {
  Tag.find({}, { _id: false })
    .then((tags) => {
      res.json({ tags });
    });
};

