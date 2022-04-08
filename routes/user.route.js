const express = require("express");
const { authenticateJWT } = require("../auth/authenticated");

const db = require("../models");
const { User } = db.sequelize.models;

const { newUser } = require("./controllers/user/newUser");
const { login } = require("./controllers/user/login");
const { logout } = require("./controllers/user/logout");
const { guest } = require("./controllers/user/guest");
const { fetchUsers } = require("./controllers/user/fetchUsers");

const router = express.Router();
require("dotenv").config();

router.get("/", fetchUsers);
router.post("/create", newUser);
router.post("/logout", authenticateJWT, logout);
router.post("/guest", guest);
router.post("/login", login);

router.get("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  res.json(user);
});

router.get("/error", (req, res) =>
  res.json({ error: "Username or Password is incorrect" })
);

module.exports = router;
