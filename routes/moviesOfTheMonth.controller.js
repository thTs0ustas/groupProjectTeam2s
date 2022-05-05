const express = require("express");
const { Op } = require("sequelize");

const router = express.Router();
const db = require("../models");
const { map, filter, sampleSize } = require("lodash");
const { Movie, MovieOfTheMonth, Screening, Seat, Auditorium, ReservedSeat, Cinema } = db.sequelize.models;

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
  const today = 2; //new Date().getDay();
  const moviesOfTheMonth = await MovieOfTheMonth.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Movie,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: Screening,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  const moviesToReturn = filter(
    map(moviesOfTheMonth, (item) => today === new Date(item.Screenings[0]?.movie_date).getDay() && item),
    undefined
  );

  res.json(moviesToReturn);
});

router.get("/upcoming", async (req, res) => {
  const showingNowMovies = await MovieOfTheMonth.findAll({
    attributes: ["id", "movie_id"],
  });

  const upcoming = await Movie.findAll(
    {
      attributes: ["id", "title", "description", "image", "duration", "genre"],
      where: {
        id: {
          [Op.notIn]: showingNowMovies.map((item) => item.movie_id),
        },
      },
    },
    12
  );

  const movies = sampleSize(upcoming, 12);

  res.json(movies);
});

router.get("/showingNow", async (req, res) => {
  const showingNowMovies = await MovieOfTheMonth.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Movie,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  });
  res.json(showingNowMovies);
});

router.get("/reservation/:id", async (req, res) => {
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
    include: [{ model: ReservedSeat, attributes: ["id", "seats_id", "screening_id"] }],
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

module.exports = router;
