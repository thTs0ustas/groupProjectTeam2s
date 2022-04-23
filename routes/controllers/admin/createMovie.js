const db = require("../../../models");
const { Movie } = db.sequelize.models;

const createMovie = async (req, res) => {
  const { title, description, duration, genre, releaseYear } = req.body.values;

  const newMovies = await Movie.create({
    title,
    description,
    duration,
    genre,
    release_year: +releaseYear,
    /* image */
  });
  res.json(newMovies);
};

module.exports = createMovie;
