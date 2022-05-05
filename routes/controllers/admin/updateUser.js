const db = require("../../../models");
const { User } = db.sequelize.models;

const { keys, forEach } = require("lodash");

const updateUser = async (req, res) => {
  const values = req.body;
  const updates = {};

  forEach(keys(values), (item) => {
    if (values[item]) updates[item] = values[item];
  });
  await User.update({ ...updates }, { where: { id: req.params.userId } });
  const user = await User.findOne({ where: { id: req.params.userId } });
  res.json(user);
};

module.exports = updateUser;
