const express = require("express");
const router = express.Router();
const { checkAuth } = require("../util/checkAuth");

const {
  createPost,
  getAllPosts,
  getPostById,
  getPostByUserId,
  getPostByUpazila,
  getPostByDistrict,
  getPostByDivision,
  updatePost,
  deletePost,
} = require('../controller/post');

router.route("/new").post(checkAuth, createPost);
router.route("/all").get(getAllPosts);
router.route("/:id").get(checkAuth, getPostById);
router.route("/user/:id").get(getPostByUserId);
router.route('/byupazila').post(getPostByUpazila);
router.route('/bydistrict').post(getPostByDistrict);
router.route('/bydivision').post(getPostByDivision);
router.route("/update/:id").put(checkAuth, updatePost);
router.route("/delete/:id").delete(deletePost);
module.exports = router;
