const router = require('express').Router();
const controller = require('./today-novel.controller');
const authMiddleWare = require('../../middleware/auth');

router.use('/new', authMiddleWare);
router.post('/new', controller.post);
router.get('/now', controller.now);
router.get('/list', controller.list);
router.get('/list/:id', controller.listWithParams);
router.put('/list/:id', authMiddleWare, controller.modify);
router.delete('/list/:id', authMiddleWare, controller.remove);

module.exports = router;
