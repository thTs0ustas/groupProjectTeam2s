const express = require("express");
const router = express.Router();
const db = require("../models");
const { Movie, MovieOfTheMonth, Screening } = db.sequelize.models;

router.get("/", async (req, res) => {
  const moviesOfTheMonth = await MovieOfTheMonth.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Movie,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  });
  console.log(moviesOfTheMonth)
  res.json(moviesOfTheMonth);
});

router.get("/:id", async (req, res) => {
  const movieOfTheMonth = await MovieOfTheMonth.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["id","createdAt", "updatedAt", "movie_id", "admin_id"] },
    include: [
      {
        model: Movie,
        attributes: { exclude: ["id","createdAt", "updatedAt"] },
      },
      {
        model: Screening,
        attributes: ["auditorium_id", "movie_starts", "movie_ends", "movie_date"],
      }
    ]
  })
  console.log(movieOfTheMonth)
  res.json(movieOfTheMonth);
});

router.post("/add", async (req, res) => {
  const movie = await Movie.findByPk(req.body.movie_id);
  await movie.createMovieOfTheMonth();
  const moviesOfTheMonth = await MovieOfTheMonth.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Movie,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  }); 
  res.json(moviesOfTheMonth);
});

module.exports = router;
