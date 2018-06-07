const router = require('express').Router();
const controller = require('./user.controller');
const authMiddleWare = require('../../middleware/auth');

router.use('/list', authMiddleWare);
router.get('/list', controller.list);
router.use('/assing-admin', authMiddleWare);
router.post('/assign-admin', controller.assignAdmin);
router.get('/profile-pic/:username', controller.profilepic);
router.get('/:username', controller.info);
router.put('/:id', authMiddleWare, controller.put);
router.post('/:id/bookmark', authMiddleWare, controller.bookMarkPost);
router.delete('/:id/bookmark/:docNo', authMiddleWare, controller.bookMarkDelete);

module.exports = router;
