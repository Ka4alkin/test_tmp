const express = require('express');
const router = new express.Router();
const validate = require('../middlewares/validatorMiddleware-middleware');
const {actorCreateValidation, actorUpdateValidation} = require('../validation/actors-validation');
const checkAuth = require('../middlewares/check-auth-middleware');
const {createActor, updateActor, deleteActor, listActors, getActor} = require('../controllers/actors-controller');
const {pageInfoValidation} = require('../validation/page-info-validation');


router.post('/', checkAuth, validate(actorCreateValidation), createActor);
router.get('/', checkAuth, listActors);
router.get('/:id', checkAuth, getActor);
router.put('/:id', checkAuth, validate(actorUpdateValidation), updateActor);
router.delete('/:id', checkAuth, deleteActor);

module.exports = router;
