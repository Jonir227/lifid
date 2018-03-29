const router = require('express').Router();
const authMiddleWare = require('../middleware/auth');
const auth = require('./auth');
const user = require('./user');
const tag = require('./tag');


router.use('/auth', auth);
router.use('/user', authMiddleWare);
router.use('/user', user);
router.use('/tag', tag);

module.exports = router;
