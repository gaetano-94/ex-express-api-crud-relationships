const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Funzione per creare un nuovo post
const createPost = async (req, res) => {
  const { title, slug, image, content, published, categoryId, tags } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        image,
        content,
        published,
        category: { connect: { id: categoryId } },
        tags: { connect: tags.map((tagId) => ({ id: tagId })) },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Funzione per recuperare un post utilizzando il suo slug
const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { category: true, tags: true },
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Funzione per recuperare tutti i post
const getAllPosts = async (req, res) => {
  const { published, search } = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          published !== undefined ? { published: published === 'true' } : {},
          search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { content: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
        ],
      },
      include: { category: true, tags: true },
    });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Funzione per aggiornare un post
const updatePost = async (req, res) => {
  const { slug } = req.params;
  const data = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { slug },
      data,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Funzione per eliminare un post
const deletePost = async (req, res) => {
  const { slug } = req.params;
  try {
    const deletedPost = await prisma.post.delete({
      where: { slug },
    });
    res.json(deletedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getPostBySlug,
  getAllPosts,
  updatePost,
  deletePost,
};
