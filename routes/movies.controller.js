const express = require("express");
const router = express.Router();
const db = require("../models");
const { Movie, User } = db.sequelize.models;
// const { authenticateJWT } = require("../auth/authenticated");

router.get("/", async (req, res) => {
  const movies = await Movie.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { model: User, as: "reviewed_by", attributes: ["id", "username"] },
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

router.post("/create", async (req, res) => {
  const { title, description, duration, genre } = req.body;

  const newMovies = await Movie.create({
    title,
    description,
    duration,
    genre /* image */,
  });
  res.json(newMovies);
});
module.exports = router;
