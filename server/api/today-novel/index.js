const router = require('express').Router();
const controller = require('./today-novel.controller');
const authMiddleWare = require('../../middleware/auth');

router.post('/', authMiddleWare, controller.post);
router.get('/now', controller.now);
router.get('/', controller.list);
router.get('/:id', controller.listWithParams);
router.put('/:id', authMiddleWare, controller.modify);
router.delete('/:id', authMiddleWare, controller.remove);

module.exports = router;
