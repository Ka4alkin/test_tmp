const AppHelper = require('../../helpers/app-helper');
const Movie = require('../../models/movies-model');
const Actor = require('../../models/actor-model');
const sequelize = require('../../database');

const messages = {
  error: {
    movieNotFound: 'movieNotFound',
    actorNotFound: 'actorNotFound',
    titleAlreadyExists: 'titleAlreadyExists',
    default: 'Error updating movieObject',
  },
};

class UpdateMovieAbl {
  async updateMovie(req, res) {
    AppHelper.isDateExist(req, res);
    const transaction = await sequelize.transaction();

    const {id} = req.params;
    const {title, year, format, actorIds} = req.body;

    try {
      const movieObject = await Movie.findByPk(id);

      if (!movieObject) {
        return AppHelper.throwError(res, messages.error.movieNotFound);
      }

      if (title && title !== movieObject.title) {
        const existingMovie = await Movie.findOne({where: {title}});
        if (existingMovie) {
          return AppHelper.throwError(res, messages.error.titleAlreadyExists);
        }
      }

      const updatedMovie = await movieObject.update({title, year, format}, {transaction});

      let updatedActors = [];

      if (actorIds) {
        const actors = await Actor.findAll({where: {id: actorIds}});

        if (actors.length !== actorIds.length) {
          await transaction.rollback();
          return AppHelper.throwError(res, messages.error.actorNotFound);
        }

        await updatedMovie.setActors(actors, {through: {selfGranted: false}, transaction});
        updatedActors = actors;
      } else {
        updatedActors = await updatedMovie.getActors();
      }

      await transaction.commit();
      res.status(200).json({...updatedMovie.toJSON(), actors: updatedActors});
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({message: messages.error.default, error: error.message});
    }
  }
}

module.exports = new UpdateMovieAbl();
