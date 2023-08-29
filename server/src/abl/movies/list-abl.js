const Actor = require('../../models/actor-model');
const Movie = require('../../models/movies-model');
const AppHelper = require('../../helpers/app-helper');

const messages = {
  error: {
    actorNotFound: 'actorNotFound',
    movieObjectNotFound: 'movieObjectNotFound',
  },
};

class ListMoviesAbl {
  async listMovies(req, res) {
    const {actorId, title, sort, order, limit, offset} = req.query;

    const pageIndex = parseInt( offset) || 0;
    const pageSize = parseInt(limit) || 50;

    // todo DRY
    if (actorId && title) {
      const actor = await Actor.findByPk(actorId);
      if (!actor) {
        AppHelper.throwError(res, messages.error.actorNotFound);
      }

      const movieList = await actor.getMovies({
        where: {title: title},
      });

      res.json(movieList);
    }

    if (actorId) {
      const actor = await Actor.findByPk(actorId);
      if (!actor) {
        AppHelper.throwError(res, messages.error.actorNotFound);
      }

      const movieList = await actor.getMovies();
      res.json(movieList);
    }

    if (title) {
      const movieObject = await Movie.findOne({
        include: Actor,
        where: {title: title},
      });

      if (!movieObject) AppHelper.throwError(res, messages.error.movieObjectNotFound);

      res.json(movieObject);
    }

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
