const router = require('express').Router();
const auth = require('./auth');
const user = require('./user');
const tag = require('./tag');


router.use('/auth', auth);
router.use('/user', user);
router.use('/tag', tag);

module.exports = router;
