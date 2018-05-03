const router = require('express').Router();
const controller = require('./today-novel.controller');
const authMiddleWare = require('../../middleware/auth');

router.use('/new', authMiddleWare);
router.post('/new', controller.post);
router.get('/now', controller.now);

module.exports = router;
