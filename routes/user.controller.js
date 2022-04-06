const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authenticateJWT } = require("../auth/authenticated");
const crypto = require("crypto");
const { Op } = require("sequelize");
const db = require("../models");
const { User } = db.sequelize.models;

const router = express.Router();
require("dotenv").config();

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

      return res.redirect(
        "/users/login?username=" + user.username + "&password=" + user.password
      );
    } catch (e) {
      return res.json({ Error: "Something went wrong. Probably your email" });
    }
  }
  res.json({ error: "User already exists" });
});

router.get("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  res.json(user);
});

router.post("/login", async (req, res) => {
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
      res.json({ error: "An error occurred" + e });
    }
  } else {
    return res.json({ message: "Username or password incorrect" });
  }
});

router.get("/error", (req, res) =>
  res.json({ error: "Username or Password is incorrect" })
);

router.post("/logout", authenticateJWT, async (req, res) => {
  await User.update(
    { access_token: "" },
    { where: { username: req.body.username } }
  );
  res.redirect("/");
});

router.post("/guest", async (req, res) => {
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
      return res.json({ Error: "Email is already in use!" + e });
    }
  }
  res.json({ error: "User already exists" });
});

module.exports = router;
