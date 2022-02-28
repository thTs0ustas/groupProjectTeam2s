const express = require("express");
const router = express.Router();
const db = require("../models");
const { Movie, MovieOfTheMonth } = db.sequelize.models;

router.get("/", async (req, res) => {
  const moviesOfTheMonth = await MovieOfTheMonth.findAll({
    include: {
      model: Movie,
    },
  });
  res.json(moviesOfTheMonth);
});
router.get("/add", async (req, res) => {
  const newMovieOfTheMonth = await MovieOfTheMonth.create({ movie_id: 1 });
  res.json(newMovieOfTheMonth);
});

module.exports = router;
