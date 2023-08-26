const {body} = require('express-validator');

const allowedFormats = ['VHS', 'DVD', 'Blu-ray'];
const validYear = {min: 1900, max: new Date().getFullYear()};
const movieCreateValidation = [
  body('title')
      .notEmpty().withMessage('Title is required')
      .isString().withMessage('Title must be a string')
      .isLength({min: 3, max: 50})
      .withMessage('Title must be between 1 and 50 characters'),

  body('releaseYear')
      .notEmpty().withMessage('Release year is required')
      .isInt({min: 1900, max: new Date().getFullYear()})
      .withMessage(`Release year must be a valid year, valid: ${JSON.stringify(validYear)}`),

  body('format')
      .notEmpty().withMessage('Format is required')
      .isIn(allowedFormats)
      .withMessage(`Invalid format, allowed: ${JSON.stringify(allowedFormats)}`),

  body('actorIds')
      .notEmpty().withMessage('ActorIds is required')
      .isArray().withMessage('Actor IDs must be an array'),
];

const movieUpdateValidation = [
  body('title')
      .optional()
      .isString().withMessage('Title must be a string')
      .isLength({min: 3, max: 50})
      .withMessage('Title must be between 1 and 50 characters'),

  body('releaseYear')
      .optional()
      .isInt({min: 1900, max: new Date().getFullYear()})
      .withMessage(`Release year must be a valid year, valid: ${JSON.stringify(validYear)}`),

  body('format')
      .optional()
      .isIn(allowedFormats)
      .withMessage(`Invalid format, allowed: ${JSON.stringify(allowedFormats)}`),

  body('actorIds')
      .optional()
      .isArray().withMessage('Actor IDs must be an array'),
];

module.exports = {movieCreateValidation, movieUpdateValidation};
