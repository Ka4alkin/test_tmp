const AppHelper = require('../helpers/app-helper');
const CreateMovieAbl = require('../abl/movies/create-abl');
const UpdateMovieAbl = require('../abl/movies/update-abl');
const ListMoviesAbl = require('../abl/movies/list-abl');
const ShowMovieAbl = require('../abl/movies/show-abl');
const DeleteMovieAbl = require('../abl/movies/delete-abl');
const ImportMovieAbl = require('../abl/movies/import-abl');

const createMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await CreateMovieAbl.create(req, res);
});

const listMovies = AppHelper.handleAsyncError(async (req, res) => {
  return await ListMoviesAbl.listMovies(req, res);
});

const showMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await ShowMovieAbl.showMovie(req, res);
});

const updateMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await UpdateMovieAbl.updateMovie(req, res);
});

const deleteMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await DeleteMovieAbl.deleteMovie(req, res);
});

const importMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await ImportMovieAbl.importMovie(req, res);
});

module.exports = {
  createMovie,
  listMovies,
  showMovie,
  updateMovie,
  importMovie,
  deleteMovie,
};
