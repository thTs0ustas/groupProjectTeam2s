const express = require("express");
const router = express.Router();
const db = require("../models");
const { User, Movie } = db.sequelize.models;

router.get("/:id/reviews", async (req, res) => {
  const users = await User.findByPk(req.params.id, {
    attributes: ["id", "username"],
    include: {
      model: Movie,
      as: "movies_reviewed",
      attributes: ["id", "title"],
    },
  });
  res.json(users);
});
router.get("/:id/reviews/add", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "username"],
    include: { model: Movie, as: "movies_reviewed" },
  });
  const movie = await Movie.findByPk(1);
  await user.addMovies_reviewed(movie, {
    through: { movie_id: movie.id, score: 4 },
  });

  res.json(user);
});

router.get("/:id/reviews/update", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "username"],
    include: { model: Movie, as: "movies_reviewed" },
  });
  const movie = await Movie.findByPk(1);
  await user.setMovies_reviewed(movie, {
    model: Movie,
    as: "movies_reviewed",
    through: { movie_id: movie.id, score: 4 },
  });

  res.json(user);
});

module.exports = router;
