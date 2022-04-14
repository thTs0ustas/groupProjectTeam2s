const db = require("../../../models");
const { User } = db.sequelize.models;

const fetchAUser = async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  res.json(user);
};

module.exports = { fetchAUser };
