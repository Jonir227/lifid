const router = require('express').Router();
const controller = require('./today-novel.controller');
const authMiddleWare = require('../../middleware/auth');

router.use('', authMiddleWare);
router.post('', controller.post);

module.exports = router;
