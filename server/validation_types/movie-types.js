const {body} = require('express-validator');

const checkIdsIsUnique = (value) => {
  const uniqueValues = new Set(value);
  if (uniqueValues.size !== value.length) {
    throw new Error('Actor IDs must be unique');
  }
  return true;
};

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
      .isArray().withMessage('Actor IDs must be an array')
      .custom((value)=>checkIdsIsUnique(value)),
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
      .isArray().withMessage('Actor IDs must be an array')
      .custom((value)=>checkIdsIsUnique(value)),

];
const getByValidation = [
  body('id')
      .optional()
      .isInt({min: 0})
      .withMessage('id must be numeric'),
  body('title')
      .optional()
      .isString()
      .withMessage('title must be a string'),
  body('actorName')
      .optional()
      .isString()
      .withMessage('actorName must be a string'),
];

module.exports = {movieCreateValidation, movieUpdateValidation, getByValidation};
