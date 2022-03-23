const express = require("express");
const router = express.Router();

const db = require("../models");
const { Seat, Auditorium } = db.sequelize.models;

router.get("/:auditorium_id", async (req, res) => {
  const reservedSeats = await Seat.findAll({
    where: { auditorium_id: req.params.auditorium_id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Auditorium,
      attributes: ["id", "hall_num", "total_seats", "columns"],
    },
  });
  res.json(reservedSeats);
});

router.post("/add/:aud_id", async (req, res) => {
  const auditorium_id = req.params.aud_id;

  const newSeats = req.body.length
    ? req.body.map(
        async (seat) =>
          await Seat.create({
            row_letter: seat.row_letter,
            seat_num: seat.seat_num,
            auditorium_id,
            cost: seat.cost,
          })
      )
    : await Seat.create({
        row_letter: req.body.row_letter,
        seat_num: req.body.seat_num,
        auditorium_id,
        cost: req.body.cost,
      });
  res.json(newSeats);
});

module.exports = router;
