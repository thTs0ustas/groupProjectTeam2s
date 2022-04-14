const express = require("express");
const router = express.Router();
const db = require("../models");
const { Screening, MovieOfTheMonth, Movie} =
  db.sequelize.models;

router.get("/", async function (req, res) {
  let screenings = await Screening.findAll({
    // include: [
    //   {
    //     model: MovieOfTheMonth,
    //     attributes: ["id", "movie_id", "admin_id"],
    //     include: {
    //       model: Movie,
    //       attributes: ["id", "title", "duration", "genre"],
    //     },
    //   },
    //   {
    //     model: Auditorium,
    //     attributes: ["id", "hall_num", "total_seats", "columns"],
    //   },
    // ],
    attributes: [
      "id",
      "movie_starts",
      "movie_ends",
      "movie_date",
      "auditorium_id",
      "movies_month_id",
    ],
  });
  res.json(screenings);
});


router.get("/:id", async (req, res) => {
  const screening = await Screening.findOne({
    
    attributes: ["id","auditorium_id", "movie_starts", "movie_ends", "movie_date"], 
    include: [
      {
        model: MovieOfTheMonth,
        where: {id: req.params.id},
        attributes: ["id"],
        include: {
          model: Movie,
          attributes: ["id", "title", "duration", "genre"],
        },
      },
    ],
  
    })
  console.log(screening)
  res.json(screening);
})


router.post("/add", async function (req, res) {
  const {
    movies_month_id,
    auditorium_id,
    movie_starts,
    movie_ends,
    movie_date,
  } = req.body;

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
