const express = require("express");
const router = express.Router();
const db = require("../models");
const { Movie, User, MovieOfTheMonth, Screening } = db.sequelize.models;

router.get("/", async (req, res) => {
  const movies = await Movie.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    // include: { model: User, as: "reviewed_by", attributes: ["id", "username"] },
  });
  res.json(movies);
});

router.get("/:title", async (req, res) => {
  console.log(req.params.title);
  const movies = await Movie.findOne({
    where: { title: req.params.title },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { model: User, as: "reviewed_by", attributes: ["id", "username"] },
  });
  console.log(movies);
  res.json(movies);
});

router.get("/genre/:genre", async (req, res) => {
  const movieByGenre = await Movie.findAll({
    where: { genre: req.params.genre },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(movieByGenre);
});

router.get("/moviepage/:id", async (req, res) => {
  const movieInfo = await Movie.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  const isMovieOfTheMonth = await movieInfo?.getMovieOfTheMonths();
  const movieOfTheMonthScreenings = await MovieOfTheMonth.findByPk(isMovieOfTheMonth[0]?.id, {
    include: {
      model: Screening,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  });

  console.log({ movie: movieInfo, screenings: movieOfTheMonthScreenings?.Screenings });
  res.json({ movie: movieInfo, screenings: movieOfTheMonthScreenings?.Screenings });
});

module.exports = router;
