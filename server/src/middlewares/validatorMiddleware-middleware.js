const {validationResult} = require('express-validator');

/**
 * Middleware for request validation using express-validator.
 *
 * @param {Array} validations - An array of validation rules.
 * @return {Function} Middleware function for request validation.
 */
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({errors: errors.array()});
  };
};

module.exports = validate;
