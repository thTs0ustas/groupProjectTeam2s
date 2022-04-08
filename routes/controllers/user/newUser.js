const bcrypt = require("bcrypt");
const db = require("../../../models");
const { User } = db.sequelize.models;
const { Op } = require("sequelize");

const newUser = async (req, res) => {
  const {
    username,
    first_name,
    email,
    password,
    last_name,
    address,
    postal,
    birth_date,
    isAdmin,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const exists = await User.findOne({
    where: { [Op.or]: [{ username }, { email }] },
  });
  if (!exists) {
    try {
      const user = await User.create({
        username,
        first_name,
        email,
        last_name,
        password: hashedPassword,
        address,
        postal,
        birth_date,
        isAdmin,
      });

      return res.redirect(
        "/users/login?username=" + user.username + "&password=" + user.password
      );
    } catch (e) {
      return res.json({ Error: "Something went wrong. Probably your email" });
    }
  }
  res.json({ error: "User already exists" });
};

module.exports = { newUser };
