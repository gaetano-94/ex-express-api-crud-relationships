const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const {
  categoryValidationRules,
} = require('../validations/categoryValidation');

const router = express.Router();

router.post('/categories', categoryValidationRules, createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', categoryValidationRules, updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
