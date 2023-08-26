const {body} = require('express-validator');

const pageInfoValidation = [
  body('pageInfo.pageIndex')
      .optional()
      .isInt({min: 0})
      .withMessage('pageIndex must be a non-negative integer'),

  body('pageInfo.pageSize')
      .optional()
      .isInt({min: 1, max: 500})
      .withMessage('pageSize must be a positive integer'),
];

module.exports = {
  pageInfoValidation,
};
