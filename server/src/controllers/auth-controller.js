const AppHelper = require('../helpers/app-helper');
const UserCreateAbl = require('../abl/users/create-abl');
const ListUsersAbl = require('../abl/users/list-abl');

const userCreate = AppHelper.handleAsyncError(async (req, res) => {
  return await UserCreateAbl.userCreate(req, res);
});

const listUsers = AppHelper.handleAsyncError(async (req, res) => {
  return await ListUsersAbl.listUsers(req, res);
});

module.exports = {
  userCreate,
  listUsers,
};
