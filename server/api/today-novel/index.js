const router = require('express').Router();
const controller = require('./today-novel.controller');
const authMiddleWare = require('../../middleware/auth');

router.get('/now', controller.now);

router.post('', authMiddleWare, controller.post);
router.get('', controller.list);

router.get('/:id', controller.listWithParams);

router.put('/:id', authMiddleWare, controller.put);
router.delete('/:id', authMiddleWare, controller.delete);

module.exports = router;
