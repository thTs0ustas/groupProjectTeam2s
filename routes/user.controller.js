require("dotenv").config();
const jwt = require("jsonwebtoken");
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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username }, raw: true });
  if (user == null) {
    return res.json({ message: "No user with that username" });
  }
  if (await bcrypt.compare(password, user.password)) {
    try {
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.SECRET
      );
      console.log("Token", accessToken);
      await User.update(
        { access_token: accessToken },
        { where: { username: user.username } }
      );

      console.log("Token", user);
      return res.json({
        accessToken,
      });
    } catch (e) {
      res.json({ error: e });
    }
  } else {
    return res.json({ message: "Password incorrect" });
  }

  // .then(async (user) => {
  //   if (user == null) {
  //     return res.json({ message: "No user with that username" });
  //   }

  //   if (await bcrypt.compare(password, user.password)) {
  //     const accessToken = jwt.sign(
  //       { username: user.username },
  //       process.env.SECRET
  //     );
  //     console.log("Token", accessToken);
  //     user.set({ access_token: accessToken });
  //     await user.save();
  //     console.log("Token", user);
  //     return res.json({
  //       accessToken,
  //     });
  //   } else {
  //     return res.json({ message: "Password incorrect" });
  //   }
  // })
  // .catch((e) => res.json({ error: e }));
});

router.get("/error", (req, res) =>
  res.json({ error: "Username or Password is incorrect" })
);

router.post("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
