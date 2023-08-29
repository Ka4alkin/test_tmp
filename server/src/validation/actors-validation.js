const {body} = require('express-validator');

const actorCreateValidation = [
  body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isString().withMessage('Name must be a string')
      .isLength({min: 3, max: 20}).withMessage('Name must be between 3 and 10 characters')
      .matches(/^[a-zA-Zа-яА-Я\s,-]+$/).withMessage('Name can only contain letters  and - ,'),

  body('surname')
      .trim()
      .notEmpty().withMessage('Surname is required')
      .isString().withMessage('Surname must be a string')
      .isLength({min: 3, max: 20}).withMessage('Surname must be between 3 and 10 characters')
      .matches(/^[a-zA-Zа-яА-Я\s,-]+$/).withMessage('Surname can only contain letters and - ,'),
];

const actorUpdateValidation = [
  body('name')
      .optional()
      .trim()
      .isString().withMessage('Name must be a string')
      .isLength({min: 3, max: 20}).withMessage('Name must be between 3 and 10 characters')
      .matches(/^[a-zA-Zа-яА-Я\s,-]+$/).withMessage('Name can only contain letters  and - ,'),

  body('surname')
      .optional()
      .trim()
      .isString().withMessage('Surname must be a string')
      .isLength({min: 3, max: 20}).withMessage('Surname must be between 3 and 10 characters')
      .matches(/^[a-zA-Zа-яА-Я\s,-]+$/).withMessage('Surname can only contain letters  and - ,'),
];

module.exports = {actorCreateValidation, actorUpdateValidation};
