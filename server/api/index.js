const router = require('express').Router();
const auth = require('./auth');
const user = require('./user');
const tag = require('./tag');
const novella = require('./novella');
const todayNovel = require('./today-novel');


router.use('/auth', auth);
router.use('/user', user);
router.use('/tag', tag);
router.use('/novella', novella);
router.use('/today-novel', todayNovel);

module.exports = router;
