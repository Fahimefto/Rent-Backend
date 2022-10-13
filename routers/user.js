const express = require('express');
const router = express.Router();
const { checkAuth } = require('../util/checkAuth');

const {
  getAllusesrs,
  register,
  login,
  logout,
  getCurrentUser,
  updateUser,
} = require('../controller/user');

router.route('/all').get(checkAuth, getAllusesrs);
router.route('/me').get(checkAuth, getCurrentUser).put(checkAuth, updateUser);
router.route('/new').post(register);
router.route('/login').post( login);
router.route('/logout').get(logout);

module.exports = router;
