const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../models");
const {
  Movie,
  MovieOfTheMonth,
  Screening,
  Seat,
  Auditorium,
  ReservedSeat,
  Cinema,
} = db.sequelize.models;

router.get("/", async (req, res) => {
  const moviesOfTheMonth = await MovieOfTheMonth.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Movie,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  });

  res.json(moviesOfTheMonth);
});

router.get("/homepageLayout", async (req, res) => {
  const moviesOfTheMonth = await MovieOfTheMonth.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [{
      model: Movie,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }, {
      model: Screening,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }]
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

router.get("/:id", async (req, res) => {
  const movie = await MovieOfTheMonth.findByPk(req.params.id, {
    attributes: ["id"],
    include: [
      {
        model: Movie,
        attributes: ["id", "title", "image"],
      },
    ],
  });

  const screenings = await Screening.findAll({
    where: { movies_month_id: movie.id },
    include: [{ model: ReservedSeat, attributes: ["id", "seats_id"] }],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  const auditoriums = await Auditorium.findAll({
    where: {
      id: { [Op.or]: [...new Set(screenings.map((s) => s.auditorium_id))] },
    },
    include: [
      { model: Seat, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: Cinema, attributes: ["id", "address"] },
    ],
  });

  res.json({ movie, screenings, auditoriums });
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
