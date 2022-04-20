const db = require("../../../models");
const { Movie } = db.sequelize.models;

const { keys, forEach } = require("lodash");

const updateMovie = async (req, res) => {
  const values = req.body.values;
  const updates = {};
  forEach(keys(values), (item) => {
    if (values[item]) updates[item] = values[item];
  });
  const movie = await Movie.update({ ...updates }, { where: { id: req.params.id } });
  res.json(movie);
};

module.exports = updateMovie;
