const Movie = require('../../models/movie');

const messages = {
  error: {
    movieNotFound: 'movieNotFound',
  },
  success: {
    movieDeleted: 'Movie deleted successfully',
  },
};

class DeleteAbl {
  async delete(req, res) {
    const {id} = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      return res.status(404).json({message: messages.error.movieNotFound});
    }

    await movie.destroy();
    res.json({message: messages.success.movieDeleted});
  }
}

module.exports = new DeleteAbl();
