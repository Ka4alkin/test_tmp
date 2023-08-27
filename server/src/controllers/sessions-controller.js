const AppHelper = require('../helpers/app-helper');
const SessionCreateAbl = require('../abl/sessions/create-abl');

const sessionCreate = AppHelper.handleAsyncError(async (req, res) => {
  return await SessionCreateAbl.createSession(req, res);
});

module.exports = {
  sessionCreate,
};
