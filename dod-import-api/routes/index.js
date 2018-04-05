var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/contracts', db.getAllContracts);
router.post('/contracts', db.createContract);


module.exports = router;
