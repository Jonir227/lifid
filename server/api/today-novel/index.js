const router = require('express').Router();
const controller = require('./today-novel.controller');
const authMiddleWare = require('../../middleware/auth');

router.use('/new', authMiddleWare);
router.post('/new', controller.post);
router.get('/now', controller.now);
router.get('/list', controller.list);
router.get('/list/:id', controller.listWithParams);
router.use('/element', authMiddleWare);
router.put('/element', controller.modify);
router.use('/element', authMiddleWare);
router.delete('/element', controller.remove);

module.exports = router;
