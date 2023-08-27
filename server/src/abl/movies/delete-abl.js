const Movie = require('../../models/movies-model');

const messages = {
  error: {
    movieNotFound: 'movieNotFound',
  },
  success: {
    movieDeleted: 'Movie deleted successfully',
  },
};

class DeleteMovieAbl {
  async deleteMovie(req, res) {
    const {id} = req.params;
    const movieObject = await Movie.findByPk(id);

    if (!movieObject) {
      return res.status(404).json({message: messages.error.movieNotFound});
    }

    await movieObject.destroy();
    res.json({message: messages.success.movieDeleted});
  }
}

module.exports = new DeleteMovieAbl();
