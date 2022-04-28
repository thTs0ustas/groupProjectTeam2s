const db = require("../../../models");
const { Movie } = db.sequelize.models;

const deleteMovie = async (req, res) => {
  await Movie.destroy({
    where: { id: req.params.movieId },
  });
  res.end();
};

module.exports = { deleteMovie };
