const router = require('express').Router();
const controller = require('./admin.controller');
const authMiddleWare = require('../../middleware/auth');

router.use('/today-novel', authMiddleWare);
router.post('/today-novel', controller.adminPost);
router.get('/today-novel', controller.adminGet);
router.delete('/today-novel', controller.adminDelete);
router.put('/today-novel', controller.adminPut);

module.exports = router;
