const AppHelper = require('../helpers/app-helper');
const CreateActorAbl = require('../abl/actor/create-abl');
const ListActorsAbl = require('../abl/actor/list-abl');
const GetActorAbl = require('../abl/actor/get-abl');
const UpdateActorAbl = require('../abl/actor/update-abl');
const DeleteActorAbl = require('../abl/actor/delete-abl');


const createActor = AppHelper.handleAsyncError(async (req, res) => {
  return await CreateActorAbl.create(req, res);
});

const listActors = AppHelper.handleAsyncError(async (req, res) => {
  return await ListActorsAbl.listActors(req, res);
});

const getActor = AppHelper.handleAsyncError(async (req, res) => {
  return await GetActorAbl.getActor(req, res);
});

const updateActor = AppHelper.handleAsyncError(async (req, res) => {
  return await UpdateActorAbl.updateActor(req, res);
});

const deleteActor = AppHelper.handleAsyncError(async (req, res) => {
  return await DeleteActorAbl.deleteActor(req, res);
});


module.exports = {
  createActor,
  listActors,
  getActor,
  updateActor,
  deleteActor,
};
