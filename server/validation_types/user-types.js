const {body} = require('express-validator');

const signupValidationPasswordOption ={
  minLength: 8, maxLength: 15, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,
};
const signupValidationPasswordMsg = `Password must be strong and meet the requirements ${JSON.stringify(signupValidationPasswordOption)}`;

const signupValidation = [
  body('username')
      .notEmpty().withMessage('Username is required')
      .isLength({min: 3, max: 15}).withMessage('Username must be between 3 and 15 characters'),
  body('password')
      .notEmpty().withMessage('Password is required')
      .isStrongPassword(signupValidationPasswordOption).withMessage(signupValidationPasswordMsg),
];


const loginValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];


module.exports = {
  signupValidation,
  loginValidation,
};
