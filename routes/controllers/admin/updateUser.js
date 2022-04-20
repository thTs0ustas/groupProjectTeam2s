const db = require("../../../models");
const { User } = db.sequelize.models;

const { keys, forEach } = require("lodash");

const updateUser = async (req, res) => {
  const values = req.body.values;
  const updates = {};
  console.log(values);

  forEach(keys(values), (item) => {
    if (values[item]) updates[item] = values[item];
  });
  const movie = await User.update({ ...updates }, { where: { id: req.params.id } });
  res.json(movie);
};

module.exports = updateUser;
