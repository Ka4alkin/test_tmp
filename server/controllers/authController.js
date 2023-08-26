const AppHelper = require('../helpers/app-helper');
const SignupAbl = require('../api/auth/signup');
const LoginAbl = require('../api/auth/login');
const GetAllUsersAbl = require('../api/auth/get-all-users');


const signup = AppHelper.handleAsyncError(async (req, res) => {
  return await SignupAbl.signup(req, res);
});

const login = AppHelper.handleAsyncError(async (req, res) => {
  return await LoginAbl.login(req, res);
});

const getAllUsers = AppHelper.handleAsyncError(async (req, res) => {
  return await GetAllUsersAbl.getAllUsers(req, res);
});

const getMe = async (req, res)=> {
  res.json(req.user);
};

module.exports = {
  signup,
  login,
  getMe,
  getAllUsers,
};
