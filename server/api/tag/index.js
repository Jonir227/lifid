const router = require('express').Router();
const controller = require('./tag.controller');

router.get('/list', controller.listGET);

module.exports = router;
