const express = require('express');
const router = new express.Router();
const validate = require('../middlewares/validatorMiddleware');
const {actorCreateValidation, actorUpdateValidation} = require('../validation_types/actor-types');
const checkAuth = require('../middlewares/check-auth');
const {createActor, getAllActors, getActorById, updateActor, deleteActor} = require('../controllers/actorsController');


router.post('/', checkAuth, validate(actorCreateValidation), createActor);
router.get('/', checkAuth, getAllActors);
router.get('/:id', checkAuth, getActorById);
router.put('/:id', checkAuth, validate(actorUpdateValidation), updateActor);
router.delete('/:id', checkAuth, deleteActor);

module.exports = router;
