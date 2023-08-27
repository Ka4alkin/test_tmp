const {body} = require('express-validator');

const signupValidation = [
  body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
  body('name')
      .notEmpty().withMessage('Name is required')
      .isString().withMessage('Name must be a string')
      .isLength({min: 3, max: 50}).withMessage('Name must be between 3 and 50 characters'),
  body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({min: 3, max: 50}).withMessage('Password must be between 5 and 15 characters'),
  body('confirmPassword')
      .notEmpty().withMessage('Confirm Password is required')
      .custom((value, {req}) => {
        if (value !== req.body.password) {
          throw new Error('Confirm Password does not match Password');
        }
        return true;
      }),
];

const loginValidation = [
  body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
  body('password')
      .notEmpty().withMessage('Password is required')
      .isString().withMessage('Password must be a string'),
];


module.exports = {
  signupValidation,
  loginValidation,
};
