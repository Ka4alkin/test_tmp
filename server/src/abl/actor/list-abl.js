const Actor = require('../../models/actor-model');

class ListActorsAbl {
  async listActors(req, res) {
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

    const totalActors = await Actor.count();
    const actorList = await Actor.findAll(findAllQuery);

    const dtoOut = {
      itemList: actorList,
      pageInfo: {
        pageIndex,
        pageSize,
        total: totalActors,
      },
    };
    res.json(dtoOut);
  }
}

module.exports = new ListActorsAbl();
