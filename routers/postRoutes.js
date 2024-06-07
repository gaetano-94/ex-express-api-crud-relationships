const express = require('express');
const {
  createPost,
  getPostBySlug,
  getAllPosts,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { postValidationRules } = require('../validations/postValidation');

const router = express.Router();

router.post('/posts', postValidationRules, createPost);
router.get('/posts/:slug', getPostBySlug);
router.get('/posts', getAllPosts);
router.put('/posts/:slug', postValidationRules, updatePost);
router.delete('/posts/:slug', deletePost);

module.exports = router;
