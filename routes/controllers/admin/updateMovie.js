const db = require("../../../models");
const { Movie } = db.sequelize.models;

const { keys, forEach } = require("lodash");

const updateMovie = async (req, res) => {
  const values = req.body;
  const updates = {};
  forEach(keys(values), (item) => {
    if (values[item]) updates[item] = values[item];
  });
  await Movie.update({ ...updates }, { where: { id: req.params.movieId } });
  const movie = await Movie.findOne({ where: { id: req.params.movieId } });

  res.json(movie);
};

module.exports = updateMovie;
