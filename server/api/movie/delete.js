const Movie = require('../../models/movie');


class DeleteAbl {
  async delete(req, res) {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      return res.status(404).json({message: 'Movie not found'});
    }

    await movie.destroy();
    res.json({message: 'Movie deleted successfully'});
  }
}

module.exports = new DeleteAbl();
