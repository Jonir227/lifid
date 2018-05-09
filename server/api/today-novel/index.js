const router = require('express').Router();
const controller = require('./today-novel.controller');
const authMiddleWare = require('../../middleware/auth');

router.use('/new', authMiddleWare);
router.post('/new', controller.post);
router.get('/now', controller.now);
router.get('/list', controller.list);
router.use('/modify', authMiddleWare);
router.put('/modify', controller.modify);
router.use('/remove', authMiddleWare);
router.delete('/remove', controller.remove);

module.exports = router;