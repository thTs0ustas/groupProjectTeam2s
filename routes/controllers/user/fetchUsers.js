const db = require("../../../models");
const { User } = db.sequelize.models;

const fetchUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

module.exports = { fetchUsers };
