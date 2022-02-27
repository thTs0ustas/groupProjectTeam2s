const express = require("express");
const router = express.Router();
const db = require("../models");
const { Screening, MovieOfTheMonth, Auditorium, Movie} = db.sequelize.models;


//  router.get('/', async function(req, res) {
//      let screenings = await Screening.findAll()
//      console.log(screenings);
//      res.json(screenings)
//  })
 router.get('/', async function(req, res) {
     let screenings = await Screening.findAll({
        include: {
            model: MovieOfTheMonth,
            attributes: ['id', 'movie_id', 'admin_id'],
            include: {
               model: Movie,
               attributes: ['id', 'title', 'duration', 'genre']
            }
        },
        attributes: ['id', 'movie_starts', 'movie_ends', 'movie_date', 'auditorium_id','movies_month_id']
      })
     console.log(screenings);
     res.json(screenings)
 })

router.get('/add/:movie_month_id/:auditorium_id', async function( req, res) {

    const movie_month = await MovieOfTheMonth.findByPk(req.params.movie_month_id, {
        attributes: ["id"]
    });
    const auditorium = await Auditorium.findByPk(req.params.auditorium_id, {
        attributes: ["id"]
    });
    const screening = await Screening.create({
        auditorium_id: auditorium.id,
        movies_month_id: movie_month.id,
        movie_starts: '2022-01-01 18:00:00',
        movie_ends: '2022-01-01 20:00:00',
        movie_date: '2022-01-01'
    })
    
    res.json(screening)
});
module.exports = router;