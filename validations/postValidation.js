const { check } = require('express-validator');

const postValidationRules = [
  check('title').not().isEmpty().withMessage('Title is required'),
  check('content').not().isEmpty().withMessage('Content is required'),
  check('slug').not().isEmpty().withMessage('Slug is required'),
  check('published').isBoolean().withMessage('Published must be a boolean'),
  check('categoryId')
    .optional()
    .isInt()
    .withMessage('Category ID must be an integer'),
  check('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of integers'),
  check('tags.*').isInt().withMessage('Each tag ID must be an integer'),
];

module.exports = {
  postValidationRules,
};
