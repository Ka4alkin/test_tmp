const express = require('express');
const router = new express.Router();
const validate = require('../middlewares/validatorMiddleware');
const {actorCreateValidation, actorUpdateValidation} = require('../validation_types/actor-types');
const checkAuth = require('../middlewares/check-auth');
const {createActor, getAllActors, getActorById, updateActor, deleteActor} = require('../controllers/actorsController');
const {pageInfoValidation} = require('../validation_types/page-info-validation');


router.post('/', checkAuth, validate(actorCreateValidation), createActor);
router.post('/get-all', checkAuth, validate(pageInfoValidation), getAllActors);
router.get('/:id', checkAuth, getActorById);
router.put('/:id', checkAuth, validate(actorUpdateValidation), updateActor);
router.delete('/:id', checkAuth, deleteActor);

module.exports = router;
