const express = require("express");
const router = express.Router();
const db = require("../models");
const { Screening, MovieOfTheMonth, Auditorium, Movie } = db.sequelize.models;

//  router.get('/', async function(req, res) {
//      let screenings = await Screening.findAll()
//      console.log(screenings);
//      res.json(screenings)
//  })
router.get("/", async function (req, res) {
  let screenings = await Screening.findAll({
    include: [
      {
        model: MovieOfTheMonth,
        attributes: ["id", "movie_id", "admin_id"],
        include: {
          model: Movie,
          attributes: ["id", "title", "duration", "genre"],
        },
      },
      {
        model: Auditorium,
        attributes: ["id", "hall_num", "total_seats", "free_seats"],
      },
    ],
    attributes: [
      "id",
      "movie_starts",
      "movie_ends",
      "movie_date",
      "auditorium_id",
      "movies_month_id",
    ],
  });
  console.log(screenings);
  res.json(screenings);
});

router.post("/add", async function (req, res) {
  const { movie_month_id, auditorium_id } = req.body;
  const movie_month = await MovieOfTheMonth.findByPk(movie_month_id, {
    attributes: ["id"],
  });
  const auditorium = await Auditorium.findByPk(auditorium_id, {
    attributes: ["id"],
  });
  const screening = await Screening.create({
    auditorium_id: !!auditorium && auditorium_id,
    movies_month_id: !!movie_month && movie_month_id,
    movie_starts: "2022-01-01 18:00:00",
    movie_ends: "2022-01-01 20:00:00",
    movie_date: "2022-01-01",
  });

  res.json(screening);
});
module.exports = router;
