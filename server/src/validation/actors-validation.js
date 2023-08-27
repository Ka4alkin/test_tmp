const {body} = require('express-validator');

const actorCreateValidation = [
  body('name')
      .notEmpty().withMessage('Name is required')
      .isString().withMessage('Name must be a string')
      .isLength({min: 3, max: 20}).withMessage('Name must be between 3 and 10 characters'),

  body('surname')
      .notEmpty().withMessage('Surname is required')
      .isString().withMessage('Surname must be a string')
      .isLength({min: 3, max: 20}).withMessage('Surname must be between 3 and 10 characters'),
];

const actorUpdateValidation = [
  body('name')
      .optional()
      .isString().withMessage('Name must be a string')
      .isLength({min: 3, max: 20}).withMessage('Name must be between 3 and 10 characters'),

  body('surname')
      .optional()
      .isString().withMessage('Surname must be a string')
      .isLength({min: 3, max: 20}).withMessage('Surname must be between 3 and 10 characters'),
];

module.exports = {actorCreateValidation, actorUpdateValidation};
