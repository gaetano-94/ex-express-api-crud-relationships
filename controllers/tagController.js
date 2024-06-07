const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');

// Create a new tag
const createTag = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    const tag = await prisma.tag.create({
      data: { name },
    });
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: 'Tag creation failed' });
  }
};

// Get all tags
const getAllTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tags' });
  }
};

// Get a tag by ID
const getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await prisma.tag.findUnique({ where: { id: parseInt(id) } });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tag' });
  }
};

// Update a tag by ID
const updateTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tag = await prisma.tag.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(tag);
  } catch (error) {
    res.status(400).json({ error: 'Tag update failed' });
  }
};

// Delete a tag by ID
const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tag.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Tag deletion failed' });
  }
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
};
