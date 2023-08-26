const Actor = require('../../models/actor');
const Movie = require('../../models/movie');

const messages = {
  error: {
    movieNotFound: 'movieNotFound',
  },
};

class GetAbl {
  async get(req, res) {
    const {title, id, actorName} = req.body;
    let movieObject;

    if (id) {
      movieObject = await Movie.findOne({
        include: [
          {
            model: Actor,
          },
        ],
        where: [{id}],
      });
    } else if (title) {
      movieObject = await Movie.findAll({
        where: {title},
      });
    } else if (actorName) {
      movieObject = await Movie.findAll({
        include: [
          {
            model: Actor,
            where: {name: actorName},
          },
        ],
      });
    }

    if (!movieObject) {
      return res.status(404).json({message: messages.error.movieNotFound});
    }

    res.json(movieObject);
  }
}

module.exports = new GetAbl();
