const router = require('express').Router();
const controller = require('./novella.controller');
const authMiddleware = require('../../middleware/auth');


// /api/novella/editor/
router.use('/editor', authMiddleware);
router.post('/editor', controller.editorPost);
router.get('/editor', controller.editorGet);
router.get('/editor/:doc_no', controller.editorGetWithParams);
router.put('/editor', controller.editorPut);
router.delete('/editor/:docNo', controller.editorDelete);

// /api/novella/reader/
router.get('/reader', controller.readerGet);
router.get('/reader/:docNo', controller.readerGetWithParams);
router.post('/reader/:docNo/:comment', authMiddleware, controller.readerCommentPost);

module.exports = router;
