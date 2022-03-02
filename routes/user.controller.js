const express = require("express");
const { Op } = require("sequelize");
const db = require("../models");

const router = express.Router();
const { User } = db.sequelize.models;

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/create", async (req, res) => {
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
        password,
        address,
        postal,
        birth_date,
        isAdmin,
      });
      return res.json(user);
    } catch (e) {
      return res.json({ Error: "Something went wrong. Probably your email" });
    }
  }
  res.json({ error: "User already exists" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: { [Op.and]: [{ username: username }, { password: password }] },
  });
  console.log(user);
  if (user) {
    return res.json(user);
  }
  res.json({ error: "User doesn't exists" });
});

module.exports = router;
