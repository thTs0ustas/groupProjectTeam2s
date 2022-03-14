const express = require("express");
const router = express.Router();

const db = require("../models");
const { Seat, Auditorium } = db.sequelize.models;

router.get("/", async (req, res) => {
  const reservedSeats = await Seat.findAll({
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
  const { row_letter, seat_num, cost } = req.body;

  const newSeats = await Seat.create({
    row_letter,
    seat_num,
    auditorium_id,
    cost,
  });
  res.json(newSeats);
});

module.exports = router;
