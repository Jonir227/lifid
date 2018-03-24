const router = require('express').Router();
const authMiddleWare = require('server/middleware/auth');
const auth = require('./auth');
const user = require('./user');


router.use('/auth', auth);
router.use('/user', authMiddleWare);
router.use('/user', user);

module.exports = router;
