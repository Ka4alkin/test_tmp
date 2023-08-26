const AppHelper = require('../helpers/app-helper');
const CreateMovieAbl = require('../api/movie/create');
const UpdateMovieAbl = require('../api/movie/update');
const GetAllMoviesAbl = require('../api/movie/get-all');
const GetMovieByAbl = require('../api/movie/get');
const DeleteMovieByIdsAbl = require('../api/movie/delete');
const UploadFromFileAbl = require('../api/movie/upload-from-file');

const createMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await CreateMovieAbl.create(req, res);
});

const getAllMovies = AppHelper.handleAsyncError(async (req, res) => {
  return await GetAllMoviesAbl.getAll(req, res);
});

const getMovieBy = AppHelper.handleAsyncError(async (req, res) => {
  return await GetMovieByAbl.get(req, res);
});

const updateMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await UpdateMovieAbl.update(req, res);
});

const deleteMovie = AppHelper.handleAsyncError(async (req, res) => {
  return await DeleteMovieByIdsAbl.delete(req, res);
});

const uploadFromFile = AppHelper.handleAsyncError(async (req, res) => {
  return await UploadFromFileAbl.uploadFromFile(req, res);
});

module.exports = {
  createMovie,
  getAllMovies,
  getMovieBy,
  updateMovie,
  deleteMovie,
  uploadFromFile,
};
