const express = require('express');
const router = express.Router();
const { checkAuth } = require('../util/checkAuth');


const {
  createPost,
  getAllPosts,
  getPostById,
  getPostByUserId,
  getPostByAddress,
  updatePost,
} = require('../controller/post');

router.route('/new').post(checkAuth, createPost);
router.route('/all').get(checkAuth, getAllPosts);
router.route('/:id').get(checkAuth, getPostById);
router.route('/user/:id').get(getPostByUserId);
router.route('/byaddress').post(getPostByAddress);
router.route('/update/:id').put(checkAuth, updatePost);
module.exports = router;