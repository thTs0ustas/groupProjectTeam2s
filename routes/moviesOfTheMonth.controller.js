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
router.post("/add", async (req, res) => {
  const movie = await Movie.findByPk(req.body.movie_id);
  await movie.createMovieOfTheMonth();
  const moviesOfTheMonth = await MovieOfTheMonth.findAll({
    include: {
      model: Movie,
    },
  });
  res.json(moviesOfTheMonth);
});

module.exports = router;
