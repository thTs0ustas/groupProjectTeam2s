const db = require("../../../models");
const { User } = db.sequelize.models;

const logout = async (req, res) => {
  await User.update(
    { access_token: "" },
    { where: { username: req.body.username } }
  );
  res.redirect("/");
};

module.exports = { logout };
