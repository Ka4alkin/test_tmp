const User = require('../../models/users-model');

class ListUsersAbl {
  async listUsers(req, res) {
    const {sort, order, limit, offset} = req.query;

    const pageIndex = parseInt( offset) || 0;
    const pageSize = parseInt(limit) || 50;

    const findAllQuery = {
      offset: pageSize * pageIndex,
      limit: pageSize,
    };

    if (sort) {
      findAllQuery.order = [[sort, order ? order : 'ASC']];
    }
    const totalUsers = await User.count();
    const users = await User.findAll(findAllQuery);

    const dtoOut = {
      itemList: users,
      pageInfo: {
        pageIndex,
        pageSize,
        total: totalUsers,
      },
    };

    res.json(dtoOut);
  }
}

module.exports = new ListUsersAbl();
