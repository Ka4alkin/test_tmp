const Actor = require('../../models/actor');
const Movie = require('../../models/movie');


class GetAbl {
  async get(req, res) {
    const movie = await Movie.findByPk(req.params.id, {include: Actor});

    if (!movie) {
      return res.status(404).json({message: 'Movie not found'});
    }

    res.json(movie);
  }
}

module.exports = new GetAbl();
