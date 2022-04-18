require("dotenv").config();
const express = require("express");
const db = require("../models");
const { Movie, User } = db.sequelize.models;
const { authenticateJWT, isAdminCheck } = require("../auth/authenticated");
const { keys, forEach } = require("lodash");
const { fetchUsers } = require("./controllers/user/fetchUsers");

const router = express.Router();

router.get("/:username/getUsers", authenticateJWT, isAdminCheck, fetchUsers);
router.put(
  "/update/user/:id",
  authenticateJWT,
  isAdminCheck,
  async (req, res) => {
    const values = req.body.values;
    const updates = {};
    console.log(values);

    forEach(keys(values), (item) => {
      if (values[item]) updates[item] = values[item];
    });
    const movie = await User.update(
      { ...updates },
      { where: { id: req.params.id } }
    );
    res.json(movie);
  }
);

router.get(
  "/:username/getMovies",
  authenticateJWT,
  isAdminCheck,
  async (req, res) => {
    const movies = await Movie.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(movies);
  }
);
module.exports = router;
