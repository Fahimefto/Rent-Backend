const express = require('express');
const router = express.Router();
const { checkAuth } = require('../util/checkAuth');


const { createPost, getAllPosts } = require('../controller/post');

router.route('/new').post(checkAuth, createPost);
router.route('/all').get(checkAuth, getAllPosts);
module.exports = router;