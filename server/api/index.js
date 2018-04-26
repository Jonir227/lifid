const router = require('express').Router();
const auth = require('./auth');
const user = require('./user');
const tag = require('./tag');
const novella = require('./novella');


router.use('/auth', auth);
router.use('/user', user);
router.use('/tag', tag);
router.use('/novella', novella);

module.exports = router;
