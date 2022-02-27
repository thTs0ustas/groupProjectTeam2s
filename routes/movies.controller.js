const express = require("express");
const router = express.Router();
const db = require("../models");
const { Movie } = db.sequelize.models;

router.get("/", async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
});

module.exports = router;
