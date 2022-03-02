const express = require("express");
const router = express.Router();
const db = require("../models");
const { ReservedSeats, Reservation, Seats } = db.sequelize.models;

router.get("/", async (req, res) => {
  const reservedSeats = await ReservedSeats.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [{ model: Reservation, attributes: ["id"] }, { model: Seats }],
  });
  res.json(reservedSeats);
});

//Reserve a Seat
router.post("/add", async (req, res) => {
  const { reservation_id, seats_id, discount_type, cost } = req.body;
  const newReservedSeats = await ReservedSeats.create({
    reservation_id,
    seats_id,
    discount_type,
    cost,
  });
  res.json(newReservedSeats);
});

module.exports = router;
