const router = require('express').Router();
const controller = require('./auth.controller');
const authMiddleWare = require('../../middleware/auth');

router.post('/register', controller.register);
router.post('/login', controller.login);

router.use('/check', authMiddleWare);
router.get('/check', controller.check);

module.exports = router;
