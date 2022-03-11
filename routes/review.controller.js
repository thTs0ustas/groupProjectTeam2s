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
router.post("/:id/reviews/add", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "username"],
    include: { model: Movie, as: "movies_reviewed" },
  });
  const movie = await Movie.findByPk(1);
  await user.addMovies_reviewed(movie, {
    through: { movie_id: movie.id, score: req.body.score },
  });

  res.redirect(`/users/${req.params.id}/reviews`);
});

router.put("/:id/reviews/update", async (req, res) => {
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

  res.redirect(`/users/${req.params.id}/reviews`);
});

module.exports = router;
