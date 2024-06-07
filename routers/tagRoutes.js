const express = require('express');
const {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} = require('../controllers/tagController');
const { tagValidationRules } = require('../validations/tagValidation');

const router = express.Router();

router.post('/tags', tagValidationRules, createTag);
router.get('/tags', getAllTags);
router.get('/tags/:id', getTagById);
router.put('/tags/:id', tagValidationRules, updateTag);
router.delete('/tags/:id', deleteTag);

module.exports = router;
