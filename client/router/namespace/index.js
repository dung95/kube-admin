const express = require('express');
const router = express.Router();
const get = require('./get');
router.get('/', (req, res) =>{
    get(req, res);
});

router.post('/', (req, res) =>{
    
});

router.get('/:name', (req, res) =>{

});

module.exports = router;