const db = require("../../../models");
const { User } = db.sequelize.models;

const logout = async (req, res) => {
  console.log(req.user.username);
  try {
    await User.update(
      { access_token: "" },
      { where: { username: req.user.username } }
    );
    res.status(200).send("Logout Successful");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { logout };
