const Actor = require('../../models/actor-model');
const Movie = require('../../models/movies-model');

class ListMoviesAbl {
  async listMovies(req, res) {
    const {sort, order, limit, offset} = req.query;

    const pageIndex = parseInt( offset) || 0;
    const pageSize = parseInt(limit) || 50;

    const findAllQuery = {
      include: Actor,
      offset: pageSize * pageIndex,
      limit: pageSize,
    };

    if (sort) {
      findAllQuery.order = [[sort, order ? order : 'ASC']];
    }

    try {
      const totalMovies = await Movie.count();
      const movies = await Movie.findAll(findAllQuery);

      const dtoOut = {
        itemList: movies,
        pageInfo: {
          pageIndex,
          pageSize,
          total: totalMovies,
        },
      };
      res.json(dtoOut);
    } catch (error) {
      res.status(500).json({message: 'Error retrieving movies', error: error.message});
    }
  }
}

module.exports = new ListMoviesAbl();
