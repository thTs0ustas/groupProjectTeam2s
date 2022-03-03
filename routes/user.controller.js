const express = require("express");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");
const passport = require("passport");

const router = express.Router();
const initializePassport = require("../passportConfig");
const { User } = db.sequelize.models;

initializePassport(
  passport,
  (email) => User.findOne({ where: { email } }),
  (id) => User.findOne({ where: { id } })
);

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
      return res.json(user);
    } catch (e) {
      return res.json({ Error: "Something went wrong. Probably your email" });
    }
  }
  res.json({ error: "User already exists" });
});

router.get("/", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: `/`,
    failureRedirect: "/",
  })
  // async (req, res) => {
  //   const { username, password } = req.body;
  //
  //   const user = await User.findOne({
  //     where: { [Op.and]: [{ username: username }, { password: password }] },
  //   });
  //
  //   if (user) {
  //     return res.json(user);
  //   }
  //   res.json({ error: "User doesn't exists" });
  // }
);

router.post("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
