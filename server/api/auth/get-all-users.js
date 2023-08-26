const User = require('../../models/user');

class GetAllUsersAbl {
  async getAllUsers(req, res) {
    const users = await User.findAll();
    res.json(users);
  }
}

module.exports = new GetAllUsersAbl();
