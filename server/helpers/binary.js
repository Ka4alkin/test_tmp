const BinaryHelper = {
  parseMovies: (fileContent) => {
    const movies = [];
    const lines = fileContent.split('\n\n');

    for (const line of lines) {
      const movieInfo = {};
      const properties = line.split('\n');

      for (const prop of properties) {
        const [key, value] = prop.split(': ');
        movieInfo[key] = value;
      }

      movies.push(movieInfo);
    }

    return movies;
  },
};
module.exports = BinaryHelper;
