const db = require("../../../models");
const { Movie } = db.sequelize.models;

const createMovieOfTheMonth = async (req, res) => {
  const movie = await Movie.findByPk(req.body.values);

  await movie.createMovieOfTheMonth();

  res.status(204).end();
};

module.exports = createMovieOfTheMonth;
