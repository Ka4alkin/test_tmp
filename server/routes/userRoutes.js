const express = require('express');
const router = new express.Router();
const userController = require('../controllers/authController');
const validate = require('../middlewares/validatorMiddleware');
const checkAuth = require('../middlewares/check-auth');
const {
  signupValidation,
  loginValidation,
} = require('../validation_types/user-types');


router.post('/signup', validate(signupValidation), userController.signup);
router.post(
    '/signin-with-password',
    validate(loginValidation),
    userController.login,
);
router.get('/get-me', checkAuth, userController.getMe);
router.get('/get-all-users', checkAuth, userController.getAllUsers);

module.exports = router;
