const db = require("../../../models");
const { User } = db.sequelize.models;

const fetchAUser = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password", "isAdmin", "isMember", "createdAt", "updatedAt"] },
  });
  res.json(user);
};

module.exports = { fetchAUser };
