const bcrypt = require("bcrypt");
const db = require("../../../models");
const { User } = db.sequelize.models;
const { Op } = require("sequelize");

const newUser = async (req, res) => {
  const { username, first_name, email, password, last_name, address, postal, birth_date, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const exists = await User.findOne({
    where: { [Op.or]: [{ username }, { email }] },
  });
  if (!exists) {
    try {
      await User.create({
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

      return res.json({ message: "New user created" });
    } catch (e) {
      return res.json({ message: "Something went wrong. Probably your email" });
    }
  }
  return res.json({ message: "Username or email already exists" });
};

module.exports = { newUser };
