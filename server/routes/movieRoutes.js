const express = require('express');
const router = new express.Router();
const {movieCreateValidation, movieUpdateValidation, getByValidation} = require('../validation_types/movie-types');
const validate = require('../middlewares/validatorMiddleware');
const checkAuth = require('../middlewares/check-auth');
const {
  createMovie,
  getAllMovies,
  getMovieBy,
  updateMovie,
  uploadFromFile,
  deleteMovie,
} = require('../controllers/movieController');
const {pageInfoValidation} = require('../validation_types/page-info-validation');


router.post('', checkAuth, validate(movieCreateValidation), createMovie);
router.post('/get-all', checkAuth, validate(pageInfoValidation), getAllMovies);
router.post('/get-by', checkAuth, validate(getByValidation), getMovieBy);
router.post('/upload-from-file', checkAuth, uploadFromFile);
router.put('/:id', checkAuth, validate(movieUpdateValidation), updateMovie);
router.delete('/:id', checkAuth, deleteMovie);

module.exports = router;
