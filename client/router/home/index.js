const express = require('express');
const router = express.Router();
const get = require('./get');
router.get('/', (req, res) =>{
    get(req, res);
});

module.exports = router;