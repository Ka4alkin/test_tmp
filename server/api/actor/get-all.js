const Actor = require('../../models/actor');

class GetAllAbl {
  async getAll(req, res) {
    const {pageInfo} = req.body;

    const pageIndex = parseInt(pageInfo?.pageIndex) || 0;
    const pageSize = parseInt(pageInfo?.pageSize) || 50;

    const totalActors = await Actor.count();
    const actors = await Actor.findAll({
      offset: pageSize * pageIndex,
      limit: pageSize,
    });
    const dtoOut = {
      itemList: actors,
      pageInfo: {
        pageIndex,
        pageSize,
        total: totalActors,
      },
    };
    res.json(dtoOut);
  }
}

module.exports = new GetAllAbl();
