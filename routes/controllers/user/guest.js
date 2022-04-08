const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../../models");
const { User } = db.sequelize.models;

const guest = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const exists = await User.findOne({
    where: { email },
  });
  if (!exists) {
    try {
      const randomPassword = crypto.randomBytes(8).toString("hex");
      const user = await User.create({
        username: `${first_name}_${last_name}_${crypto
          .randomBytes(4)
          .toString("hex")}`,
        first_name,
        last_name,
        password: await bcrypt.hash(randomPassword, 10),
        email,
        isAdmin: false,
      });

      const accessToken = jwt.sign(
        { username: user.username, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 60 * 60 }
      );

      await User.update(
        { access_token: accessToken },
        { where: { username: user.username } }
      );

      return res.json({
        username: user.username,
        accessToken,
      });
    } catch (e) {
      return res.json({ message: "Email is already in use!" + e });
    }
  }
  res.json({ message: "User already exists" });
};

module.exports = { guest };
