const express = require("express");
const router = express.Router();
const db = require("../models");
const { Movie, User } = db.sequelize.models;
const { authenticateJWT, isAdminCheck } = require("../auth/authenticated");
const { keys, forEach } = require("lodash");

router.get("/", async (req, res) => {
  const movies = await Movie.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    // include: { model: User, as: "reviewed_by", attributes: ["id", "username"] },
  });
  res.json(movies);
});
//authenticateJWT,isAdminCheck
router.put("/update", authenticateJWT, isAdminCheck, async (req, res) => {
  const values = req.body.values;
  const updates = {};
  console.log(values);

  forEach(keys(values), (item) => {
    if (values[item]) updates[item] = values[item];
  });
  const movie = await Movie.update(
    { ...updates },
    { where: { id: req.body.id } }
  );
  res.json(movie);
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

router.post("/create", authenticateJWT, isAdminCheck, async (req, res) => {
  const { title, description, duration, genre, releaseYear } = req.body.values;
  console.log(releaseYear);
  const newMovies = await Movie.create({
    title,
    description,
    duration,
    genre,
    release_year: +releaseYear,
    /* image */
  });
  res.json(newMovies);
});
module.exports = router;
