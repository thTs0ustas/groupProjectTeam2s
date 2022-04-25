const db = require("../../../models");
const { Movie, MovieOfTheMonth } = db.sequelize.models;

const getMovies = async (req, res) => {
  const movies = await Movie.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(movies);
};

const getMoviesNotPlaying = async (req, res) => {
  const moviesOfTheMonth = await MovieOfTheMonth.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const movies = await Movie.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const moviesNotPlaying = movies.filter(
    (movie) => !moviesOfTheMonth.some((movieOfTheMonth) => movie.id === movieOfTheMonth.movie_id)
  );
  res.json(moviesNotPlaying);
};

module.exports = { getMovies, getMoviesNotPlaying };
