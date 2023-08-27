const {body} = require('express-validator');

const signupValidationPasswordOption = {
  minLength: 8, maxLength: 15, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,
};
const signupValidationPasswordMsg = `Password must be strong and meet the requirements ${JSON.stringify(signupValidationPasswordOption)}`;

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
      .isStrongPassword(signupValidationPasswordOption).withMessage(signupValidationPasswordMsg),
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
      .optional()
      .isEmail().withMessage('Invalid email format'),
  body('password')
      .optional()
      .isStrongPassword(signupValidationPasswordOption).withMessage(signupValidationPasswordMsg),
];


module.exports = {
  signupValidation,
  loginValidation,
};
