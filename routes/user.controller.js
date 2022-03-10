const express = require("express");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");
const { User } = db.sequelize.models;
const passport = require("passport");

const router = express.Router();
const initializePassport = require("../passportConfig");

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

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ where: { username }, raw: true })
    .then(async (user) => {
      if (user == null) {
        return res.json({ message: "No user with that username" });
      }

      if (await bcrypt.compare(password, user.password)) {
        // console.log("Nice");
        // return done(null, user);
        const accessToken = jwt.sign(
          { username: user.username, role: user.role },
          accessTokenSecret
        );
        return res.json({
          accessToken,
        });
      } else {
        return res.json({ message: "Password incorrect" });
      }
    })
    .catch(() => res.json({ error: "User doesn't exists" }));
});

router.get("/error", (req, res) =>
  res.json({ error: "Username or Password is incorrect" })
);

router.post("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
