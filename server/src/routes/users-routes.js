const express = require('express');
const router = new express.Router();
const validate = require('../middlewares/validatorMiddleware-middleware');
const checkAuth = require('../middlewares/check-auth-middleware');
const {
  signupValidation,
} = require('../validation/users-validation');
const {userCreate, listUsers} = require('../controllers/auth-controller');


router.post('/', validate(signupValidation), userCreate);
router.get('/list', checkAuth, listUsers);

module.exports = router;
