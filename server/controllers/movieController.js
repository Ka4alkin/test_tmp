const AppHelper = require('../helpers/app-helper');
const CreateMovieAbl = require('../api/movie/create');
const UpdateMovieAbl = require('../api/movie/update');
const GetAllMoviesAbl = require('../api/movie/get-all');
const GetMovieByIdsAbl = require('../api/movie/get');
const DeleteMovieByIdsAbl = require('../api/movie/delete');

const createMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await CreateMovieAbl.create(req, res);
});

const getAllMovies = AppHelper.handleAsyncError(async (req, res) => {
  return await GetAllMoviesAbl.getAll(req, res);
});

const getMovieById = AppHelper.handleAsyncError(async (req, res) => {
  return await GetMovieByIdsAbl.get(req, res);
});

const updateMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await UpdateMovieAbl.update(req, res);
});

const deleteMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await DeleteMovieByIdsAbl.delete(req, res);
});

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};