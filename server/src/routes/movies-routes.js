const express = require('express');
const router = new express.Router();
const {movieCreateValidation, movieUpdateValidation, getByValidation} = require('../validation/movies-validation');
const validate = require('../middlewares/validatorMiddleware-middleware');
const checkAuth = require('../middlewares/check-auth-middleware');
const {
  createMovie,
  listMovies,
  showMovie,
  updateMovie,
  importMovie,
  deleteMovie,
} = require('../controllers/movie-controller');
const {pageInfoValidation} = require('../validation/page-info-validation');


router.post('', checkAuth, validate(movieCreateValidation), createMovie);
router.get('/', checkAuth, listMovies);
router.get('/:id', checkAuth, showMovie);
router.post('/import', checkAuth, importMovie);
router.put('/:id', checkAuth, validate(movieUpdateValidation), updateMovie);
router.delete('/:id', checkAuth, deleteMovie);

module.exports = router;
