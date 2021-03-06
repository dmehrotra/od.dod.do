var express = require('express');
var router = express.Router();
var ww_db = require('../ww_queries');

router.get('/ww/:department_uuid?/:contractor_uuid?', ww_db.ww);
router.get('/ww_test/',ww_db.ww_test);
router.get('/c/:department_uuid?/:contractor_uuid?', ww_db.ac);


module.exports = router;
