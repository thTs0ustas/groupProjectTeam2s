const express = require("express");
const router = express.Router();
const db = require("../models");
const { Movie, MovieOfTheMonth } = db.sequelize.models;

router.get("/", async (req, res) => {
  const moviesOfTheMonth = await MovieOfTheMonth.findAll({
    include: Movie,
    attributes: ["movie_id", "admin_id", "createdAt", "updatedAt"],
  });
  res.json(moviesOfTheMonth);
});
router.get("/add", async (req, res) => {
  const newMovieOfTheMonth = await Movie.findByPk(1);
  await Movie.addMoviesOfTheMonth(newMovieOfTheMonth);
  res.json(newMovieOfTheMonth);
});

module.exports = router;
