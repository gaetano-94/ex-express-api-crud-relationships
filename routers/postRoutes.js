const express = require('express');
const router = express.Router();
const {
  createPost,
  getPostBySlug,
  getAllPosts,
  updatePost,
  deletePost,
} = require('../controllers/postController');

router.post('/posts', createPost);
router.get('/posts/:slug', getPostBySlug);
router.get('/posts', getAllPosts);
router.put('/posts/:slug', updatePost);
router.delete('/posts/:slug', deletePost);

module.exports = router;
