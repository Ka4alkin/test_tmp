const Actor = require('../../models/actor-model');
const Movie = require('../../models/movies-model');

const messages = {
  error: {
    movieNotFound: 'movieNotFound',
  },
};

class ShowMovieAbl {
  async showMovie(req, res) {
    const {id} = req.params;

    const movieObject = await Movie.findOne({
      include: [
        {
          model: Actor,
        },
      ],
      where: [{id}],
    });


    if (!movieObject) {
      return res.status(404).json({message: messages.error.movieNotFound});
    }

    res.json(movieObject);
  }
}

module.exports = new ShowMovieAbl();
