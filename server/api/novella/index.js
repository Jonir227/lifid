const router = require('express').Router();
const controller = require('./novella.controller');
const authMiddleware = require('../../middleware/auth');

router.use('/editor', authMiddleware);
router.post('/editor', controller.editorPost);
// router.get('/editor', controller.editorGet);
router.put('/editor', controller.editorPut);
router.delete('/editor', controller.editorDelete);

module.exports = router;
