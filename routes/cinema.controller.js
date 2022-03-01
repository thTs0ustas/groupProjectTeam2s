const express = require("express");
const router = express.Router();
const db = require("../models");
const { Cinema } = db.sequelize.models;

router.get("/", async (req, res) => {
  const cinema = await Cinema.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(cinema);
});

router.post("/add", async (req, res) => {
  const { address } = req.body;

  const newCinema = await Cinema.create({ address});
  res.json(newCinema);
});
module.exports = router;

