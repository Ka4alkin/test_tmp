const AppHelper = require('../../helpers/app-helper');
const Movie = require('../../models/movie');
const Actor = require('../../models/actor');
const sequelize = require('../../database');

const messages = {
  error: {
    movieWithTheSameTitleExist: 'movieWithTheSameTitleExist',
    actorDoesNoteExist: 'actorDoesNoteExist',
    maxActorsExceeded: 'maxActorsExceeded',
    default: 'Error creating movie',
  },
};

class CreateAbl {
  async create(req, res) {
    const transaction = await sequelize.transaction();

    const {title, releaseYear, format, actorIds} = req.body;

    try {
      let newMovieObject = await Movie.findOne({where: [{title}]});

      if (newMovieObject) {
        return AppHelper.throwError(res, messages.error.movieWithTheSameTitleExist);
      }

      if (actorIds.length > 10) {
        return AppHelper.throwError(res, messages.error.maxActorsExceeded);
      }

      newMovieObject = await Movie.create({title, releaseYear, format}, {transaction});

      for (const actorId of actorIds) {
        const actorObject = await Actor.findByPk(actorId, {transaction});

        if (!actorObject) {
          await transaction.rollback();
          return AppHelper.throwError(res, `${messages.error.actorDoesNoteExist} actorId: ${actorId}`);
        }

        await newMovieObject.addActor(actorObject, {through: {selfGranted: false}, transaction});
      }

      await transaction.commit();

      const actors = await newMovieObject.getActors();

      const dtoOut ={
        id: newMovieObject.id,
        title: newMovieObject.title,
        releaseYear: newMovieObject.releaseYear,
        format: newMovieObject.format,
        actors: actors,
      };

      res.status(201).json(dtoOut);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({message: messages.error.default, error: error.message});
    }
  }
}

module.exports = new CreateAbl();
