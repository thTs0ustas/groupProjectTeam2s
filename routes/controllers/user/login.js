const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../../models");
const { User } = db.sequelize.models;

const login = async (req, res) => {
  let username;
  let password;
  if (req.query.username && req.query.password) {
    username = req.query.username;
    password = req.query.password;
  } else {
    username = req.body.username;
    password = req.body.password;
  }

  const user = await User.findOne({ where: { username }, raw: true });

  if (user === null) {
    return res.json({ message: "No user with that username" });
  }

  if (await bcrypt.compare(password, user.password)) {
    try {
      const accessToken = jwt.sign(
        { username: user.username, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET
        
      );

      await User.update(
        { access_token: accessToken },
        { where: { username: user.username } }
      );

      return res.json({
        username: user.username,
        accessToken,
        isMember: user.isMember,
      });
    } catch (e) {
      res.json({ error: "An error occurred" + e });
    }
  } else {
    return res.json({ message: "Username or password incorrect" });
  }
};

module.exports = { login };
