const { check } = require('express-validator');

const categoryValidationRules = [
  check('name').not().isEmpty().withMessage('Name is required'),
];

module.exports = {
  categoryValidationRules,
};
