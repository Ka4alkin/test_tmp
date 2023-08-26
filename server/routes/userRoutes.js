const express = require('express');
const router = new express.Router();
const validate = require('../middlewares/validatorMiddleware');
const checkAuth = require('../middlewares/check-auth');
const {getAllUsers, signup, login, getMe} = require('../controllers/authController');
const {
  signupValidation,
  loginValidation,
} = require('../validation_types/user-types');


router.post(
    '/signin-with-password',
    validate(loginValidation),
    login,
);
router.post('/signup', validate(signupValidation), signup);
router.get('/get-me', checkAuth, getMe);
router.get('/get-all-users', checkAuth, getAllUsers);

module.exports = router;
