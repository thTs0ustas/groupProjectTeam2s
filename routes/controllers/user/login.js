const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../../models");
const { Op } = require("sequelize");
const { User } = db.sequelize.models;

const login = async (req, res) => {
  let usernameEmail;
  let password;
  if (req.query.usernameEmail && req.query.password) {
    usernameEmail = req.query.usernameEmail;
    password = req.query.password;
  } else {
    usernameEmail = req.body.usernameEmail;
    password = req.body.password;
  }

  const user = await User.findOne({ where: { [Op.or]: [{ username: usernameEmail }, { email: usernameEmail }] } });

  if (user === null) {
    return res.json({ message: "No user with that username" });
  }

  if (await bcrypt.compare(password, user.password)) {
    try {
      const accessToken = jwt.sign(
        { username: user.usernameEmail, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET
      );

      await User.update({ access_token: accessToken }, { where: { username: user.username } });

      return res.json({
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        address: user.address,
        postal: user.postal,
        birth_date: user.birth_date,
        token: accessToken,
        isMember: user.isMember,
        isAdmin: user.isAdmin,
      });
    } catch (e) {
      res.json({ error: "An error occurred" + e });
    }
  } else {
    return res.json({ message: "Username or password incorrect" });
  }
};

module.exports = { login };
