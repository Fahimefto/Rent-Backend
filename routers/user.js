const express = require('express');
const router = express.Router();
const { getAllusesrs, register, login } = require('../controller/user');

router.route('/all').get(getAllusesrs);
router.route('/new').post(register);
router.route('/login').post(login);
module.exports = router;
