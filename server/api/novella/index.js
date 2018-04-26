const router = require('express').Router();
const controller = require('./novella.controller');
const authMiddleware = require('../../middleware/auth');

router.use('', authMiddleware);
router.post('', controller.novellaPOST);
router.put('', controller.novellaPUT);

module.exports = router;
