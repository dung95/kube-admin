const express = require('express');
const router = express.Router();

const home = require('./home/index');
const namespace = require('./namespace/index');

router.use('/namespaces', namespace);
router.use('/', home);
module.exports = router;