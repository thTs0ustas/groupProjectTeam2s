require("dotenv").config();
const express = require("express");
const { authenticateJWT } = require("../auth/authenticated");

const { newUser } = require("./controllers/user/newUser");
const { login } = require("./controllers/user/login");
const { logout } = require("./controllers/user/logout");
const { guest } = require("./controllers/user/guest");
const { fetchUsers } = require("./controllers/user/fetchUsers");
const { fetchAUser } = require("./controllers/user/fetchAUser");

const router = express.Router();

router.get("/", fetchUsers);
router.post("/create", newUser);
router.post("/logout", authenticateJWT, logout);
router.post("/guest", guest);
router.post("/login", login);
router.get("/:username", authenticateJWT, fetchAUser);

module.exports = router;
