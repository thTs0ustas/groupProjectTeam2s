const express = require("express");
const router = express.Router();

const db = require("../models");
const { Seats, Auditorium } = db.sequelize.models;

router.get("/", async (req, res) => {
  const reservedSeats = await Seats.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Auditorium,
      attributes: ["id", "hall_num", "total_seats", "free_seats"],
    },
  });
  res.json(reservedSeats);
});

router.post("/add/:aud_id", async (req, res) => {
  const auditorium_id = req.params.aud_id;
  const { row_letter, seat_num } = req.body;
  const newSeats = await Seats.create({
    row_letter,
    seat_num,
    auditorium_id,
  });
  res.json(newSeats);
});

module.exports = router;
