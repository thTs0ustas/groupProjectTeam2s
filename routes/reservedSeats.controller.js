const express = require("express");
const router = express.Router();
const db = require("../models");
const { ReservedSeat, Reservation /* Seat */ } = db.sequelize.models;

router.get("/:screening_id", async (req, res) => {
  const reservedSeats = await ReservedSeat.findAll({
    where: { screening_id: req.params.screening_id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      { model: Reservation, attributes: ["id"] },
      // { model: Seat, attributes: ["id"] },
    ],
  });
  res.json(reservedSeats);
});

//Reserve a Seat
router.post("/add", async (req, res) => {
  const { reservation_id, seats_id, discount_type, cost } = req.body;
  const newReservedSeats = await ReservedSeat.create({
    reservation_id,
    seats_id,
    discount_type,

    cost,
  });
  res.json(newReservedSeats);
});

module.exports = router;
