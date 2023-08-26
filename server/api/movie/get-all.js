const Actor = require('../../models/actor');
const Movie = require('../../models/movie');

class GetAllAbl {
  async getAll(req, res) {
    const {pageInfo} = req.body;

    const pageIndex = parseInt(pageInfo?.pageIndex) || 0;
    const pageSize = parseInt(pageInfo?.pageSize) || 50;

    try {
      const movies = await Movie.findAll({
        include: Actor,
        offset: pageSize * pageIndex,
        limit: pageSize,
        order: [['title', 'ASC']],
      });

      const dtoOut = {
        itemList: movies,
        pageInfo: {
          pageIndex,
          pageSize,
        },
      };
      res.json(dtoOut);
    } catch (error) {
      res.status(500).json({message: 'Error retrieving movies', error: error.message});
    }
  }
}

module.exports = new GetAllAbl();
