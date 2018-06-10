const router = require('express').Router();
const controller = require('./notification.controller');
const authMiddleWare = require('../../middleware/auth');

router.get('/:username', authMiddleWare, controller.get);
router.put('/:notiID', authMiddleWare, controller.put);

module.exports = router;
