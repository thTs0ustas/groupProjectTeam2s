const express = require("express");
const router = express.Router();
const db = require("../models");
const { User } = db.sequelize.models;

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/create", async (req, res) => {
  const {
    username,
    first_name,
    last_name,
    address,
    postal,
    birth_date,
    isAdmin,
  } = req.body;
  const user = await User.create({
    username,
    first_name,
    last_name,
    address,
    postal,
    birth_date,
    isAdmin,
  });
  res.json(user);
});

module.exports = router;
