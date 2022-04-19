require("dotenv").config();
const express = require("express");
const db = require("../models");
const { Movie, MovieOfTheMonth, User, Screening } = db.sequelize.models;
const { authenticateJWT, isAdminCheck } = require("../auth/authenticated");
const { keys, forEach } = require("lodash");
const { fetchUsers } = require("./controllers/user/fetchUsers");
const moment = require("moment");

const router = express.Router();

router.get("/:username/getUsers", authenticateJWT, isAdminCheck, fetchUsers);
router.get(
  "/:username/getScreenings",
  authenticateJWT,
  isAdminCheck,
  async (req, res) => {
    const screenings = await Screening.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: MovieOfTheMonth,
          attributes: ["id"],
          include: {
            model: Movie,
            attributes: ["id", "title", "duration", "genre"],
          },
        },
      ],
    });
    res.json(screenings);
  }
);
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

router.put(
  "/update/screening/:id",
  authenticateJWT,
  isAdminCheck,
  async (req, res) => {
    const values = req.body.values;
    const updates = {};
    updates.movie_starts = moment(
      `${values.movie_date} ${values.movie_starts}`,
      "YYYY-MM-DD HH:mm"
    ).format();
    updates.movie_ends = moment(
      `${values.movie_date} ${values.movie_ends}`,
      "YYYY-MM-DD HH:mm"
    ).format();
    updates.movie_date = moment(values.movie_date).format();

    console.log(updates);
    const screening = await Screening.update(
      { ...updates },
      { where: { id: req.params.id } }
    );
    res.json(screening);
  }
);

router.post(
  "/:username/screening/create",
  authenticateJWT,
  isAdminCheck,
  async (req, res) => {
    const values = req.body.values;
    const newScreeningData = {};
    newScreeningData.movies_month_id = +values.movie_id;
    newScreeningData.auditorium_id = values.auditorium_id;
    newScreeningData.movie_starts = moment(
      `${values.movie_date} ${values.movie_starts}`,
      "YYYY-MM-DD HH:mm"
    ).format();
    newScreeningData.movie_ends = moment(
      `${values.movie_date} ${values.movie_ends}`,
      "YYYY-MM-DD HH:mm"
    ).format();
    newScreeningData.movie_date = moment(values.movie_date).format();
    console.log(newScreeningData);

    const newScreening = await Screening.create({
      ...newScreeningData,
    });

    res.status(204).json(newScreening);
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
router.get(
  "/:username/getMoviesOfTheMonth",
  authenticateJWT,
  isAdminCheck,
  async (req, res) => {
    const movies = await MovieOfTheMonth.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Movie,
          attributes: ["id", "title"],
        },
      ],
    });
    res.json(movies);
  }
);
module.exports = router;
