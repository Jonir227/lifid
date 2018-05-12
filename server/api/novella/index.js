const router = require('express').Router();
const controller = require('./novella.controller');
const authMiddleware = require('../../middleware/auth');

router.use('/editor', authMiddleware);
router.post('/editor', controller.editorPost);
router.get('/editor', controller.editorGet);
router.get('/editor/:doc_no', controller.editorGetWithParams);
router.put('/editor', controller.editorPut);
router.delete('/editor/:docNo', controller.editorDelete);

module.exports = router;
