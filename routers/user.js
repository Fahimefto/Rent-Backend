const express = require('express');
const router = express.Router();
const { getAllusesrs, register } = require('../controller/user');

router.route('/all').get(getAllusesrs);
router.route('/new').post(register);
module.exports = router;
