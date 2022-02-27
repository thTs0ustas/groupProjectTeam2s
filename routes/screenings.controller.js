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




module.exports = router;