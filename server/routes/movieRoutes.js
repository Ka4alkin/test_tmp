const express = require('express');
const router = new express.Router();
const {movieCreateValidation} = require('../validation_types/movie-types');
const validate = require('../middlewares/validatorMiddleware');
const checkAuth = require('../middlewares/check-auth');
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');
const {actorUpdateValidation} = require('../validation_types/actor-types');


router.post('', checkAuth, validate(movieCreateValidation), createMovie);
router.get('', checkAuth, getAllMovies);
router.get('/:id', checkAuth, getMovieById);
router.put('/:id', checkAuth, validate(actorUpdateValidation), updateMovie);
router.delete('/:id', checkAuth, deleteMovie);

module.exports = router;
