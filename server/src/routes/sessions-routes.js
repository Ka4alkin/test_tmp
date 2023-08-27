const express = require('express');
const router = new express.Router();
const validate = require('../middlewares/validatorMiddleware-middleware');
const {
  loginValidation,
} = require('../validation/users-validation');
const {sessionCreate} = require('../controllers/sessions-controller');


router.post(
    '/',
    validate(loginValidation),
    sessionCreate,
);

module.exports = router;
