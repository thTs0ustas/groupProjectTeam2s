const express = require("express");
const router = express.Router();
const db = require("../models");
const { Screening, MovieOfTheMonth, Movie } = db.sequelize.models;

router.get("/", async function (req, res) {
  let screenings = await Screening.findAll({
    attributes: ["id", "movie_starts", "movie_ends", "movie_date", "auditorium_id", "movies_month_id"],
  });
  res.json(screenings);
});

router.get("/:movieTitle", async (req, res) => {
  const moviesOfTheMonth = await Movie.findOne({
    attributes: ["id"],
    where: { title: req.params.movieTitle },
  }).then(
    async (movie) =>
      await MovieOfTheMonth.findOne({
        where: { movie_id: movie.id },
      })
  );
  res.json(moviesOfTheMonth);
});

router.get("/:id", async (req, res) => {
  const screening = await Screening.findOne({
    attributes: ["id", "auditorium_id", "movie_starts", "movie_ends", "movie_date"],
    include: [
      {
        model: MovieOfTheMonth,
        where: { id: req.params.id },
        attributes: ["id"],
        include: {
          model: Movie,
          attributes: ["id", "title", "duration", "genre"],
        },
      },
    ],
  });

  res.json(screening);
});

router.post("/add", async function (req, res) {
  const { movies_month_id, auditorium_id, movie_starts, movie_ends, movie_date } = req.body;

  const screening = await Screening.create({
    auditorium_id,
    movies_month_id,
    movie_starts,
    movie_ends,
    movie_date,
  });

  res.json(screening);
});

module.exports = router;
