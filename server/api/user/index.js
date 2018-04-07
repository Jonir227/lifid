const router = require('express').Router();
const controller = require('./user.controller');
const authMiddleWare = require('../../middleware/auth');

router.use('/list', authMiddleWare);
router.get('/list', controller.list);
router.use('/assing-admin', authMiddleWare);
router.post('/assign-admin', controller.assignAdmin);
router.get('/profile-pic/:username', controller.profilepic);

module.exports = router;
