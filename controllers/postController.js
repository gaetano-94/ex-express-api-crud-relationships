const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');

// Create a new post
const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, slug, published, categoryId, tags } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        published,
        categoryId,
        tags: {
          connect: tags.map((tag) => ({ id: tag })),
        },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Post creation failed' });
  }
};

// Get a post by slug
const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
        tags: true,
      },
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
};

// Get all posts with optional filtering
const getAllPosts = async (req, res) => {
  const { published, search } = req.query;
  let where = {};
  if (published) {
    where.published = published === 'true';
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }
  try {
    const posts = await prisma.post.findMany({
      where,
      include: {
        category: true,
        tags: true,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

// Update a post by slug
const updatePost = async (req, res) => {
  const { slug } = req.params;
  const { title, content, published, categoryId, tags } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: {
        title,
        content,
        published,
        categoryId,
        tags: {
          set: tags.map((tag) => ({ id: tag })),
        },
      },
      include: {
        category: true,
        tags: true,
      },
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Post update failed' });
  }
};

// Delete a post by slug
const deletePost = async (req, res) => {
  const { slug } = req.params;
  try {
    await prisma.post.delete({ where: { slug } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Post deletion failed' });
  }
};

module.exports = {
  createPost,
  getPostBySlug,
  getAllPosts,
  updatePost,
  deletePost,
};
