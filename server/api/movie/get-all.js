const Actor = require('../../models/actor');
const Movie = require('../../models/movie');

class GetAllAbl {
  async getAll(req, res) {
    const movies = await Movie.findAll({include: Actor});
    res.json(movies);
  }
}

module.exports = new GetAllAbl();
