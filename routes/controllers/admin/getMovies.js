const db = require("../../../models");
const { Movie } = db.sequelize.models;

const getMovies = async (req, res) => {
  const movies = await Movie.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(movies);
};

module.exports = getMovies;
