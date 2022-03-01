const express = require("express");
const router = express.Router();
const db = require("../models");
const { Movie, User } = db.sequelize.models;

router.get("/", async (req, res) => {
  const movies = await Movie.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { model: User, as: "reviewed_by", attributes: ["id", "username"] },
  });
  res.json(movies);
});

router.post("/create", async (req, res) => {
  const { title, description, duration, genre } = req.body;

  const newMovies = await Movie.create({ title, description, duration, genre });
  res.json(newMovies);
});
module.exports = router;
