const { check } = require('express-validator');

const tagValidationRules = [
  check('name').not().isEmpty().withMessage('Name is required'),
];

module.exports = {
  tagValidationRules,
};
