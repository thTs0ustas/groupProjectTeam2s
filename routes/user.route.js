require("dotenv").config();
const express = require("express");
const { authenticateJWT, isAdminCheck } = require("../auth/authenticated");

const { newUser, checkUser } = require("./controllers/user/newUser");
const { login } = require("./controllers/user/login");
const { logout } = require("./controllers/user/logout");
const { guest } = require("./controllers/user/guest");
const { fetchUsers } = require("./controllers/user/fetchUsers");
const { fetchAUser } = require("./controllers/user/fetchAUser");
const { updateUserInfo } = require("./controllers/user/updateUser");

const router = express.Router();

router.get("/", authenticateJWT, isAdminCheck, fetchUsers);
router.get("/:id", authenticateJWT, fetchAUser);
router.post("/create", newUser);
router.post("/logout", authenticateJWT, logout);
router.post("/guest", guest);
router.post("/login", login);
router.post("/create/check", checkUser);
router.put("/update/:id", updateUserInfo);

module.exports = router;
