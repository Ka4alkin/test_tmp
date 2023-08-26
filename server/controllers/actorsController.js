const AppHelper = require('../helpers/app-helper');
const CreateActorAbl = require('../api/actor/create');
const GetAllActorsAbl = require('../api/actor/get-all');
const GetActorByIdAbl = require('../api/actor/get');
const UpdateActorAbl = require('../api/actor/update');
const DeleteActorAbl = require('../api/actor/delete');


const createActor = AppHelper.handleAsyncError(async (req, res) => {
  return await CreateActorAbl.create(req, res);
});

const getAllActors = AppHelper.handleAsyncError(async (req, res) => {
  return await GetAllActorsAbl.getAll(req, res);
});

const getActorById = AppHelper.handleAsyncError(async (req, res) => {
  return await GetActorByIdAbl.get(req, res);
});

const updateActor = AppHelper.handleAsyncError(async (req, res) => {
  return await UpdateActorAbl.update(req, res);
});

const deleteActor = AppHelper.handleAsyncError(async (req, res) => {
  return await DeleteActorAbl.delete(req, res);
});


module.exports = {
  createActor,
  getAllActors,
  getActorById,
  updateActor,
  deleteActor,
};
