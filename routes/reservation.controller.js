const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../models");
const { Reservation, User, Screening, ReservedSeat } = db.sequelize.models;

// User Reservations for a screening
router.get("/users/:id", async (req, res) => {
  const reservation = await User.findOne(
    {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Reservation,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          [Op.and]: [
            { user_id: req.params.id },
            { screening_id: req.query.screening },
          ],
        },
      },
    },
    { include: User, attributes: { exclude: ["createdAt", "updatedAt"] } }
  );
  res.json(reservation);
});

// All user Reservations
router.get("/users/:id/all", async (req, res) => {
  const reservation = await User.findByPk(req.params.id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Reservation,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  });
  res.json(reservation);
});

// Screening Reservations
router.get("/screenings/:id", async (req, res) => {
  const reservation = await Reservation.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: {
      screening_id: req.params.id,
    },
    include: [User, Screening],
  });
  res.json(reservation);
});

// Create a new reservation by a user
router.post("/users/:username/new", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  console.log(req.body);
  // const price = req.body.price
  const reservation = await user.createReservation({
    screening_id: req.body.data.screening_id,
    total_cost: req.body.data.price,

    purchase_date: new Date(),
  });
  console.log(req.body.data.seats);

  req.body.data.seats.forEach((seat) =>
    reservation.createReservedSeat({
      reservation_id: reservation.id,
      cost: seat.cost,
      discount_type: seat.discount_type,
      seats_id: seat.id,
      screening_id: seat.screening_id,
    })
  );

  const userWithNewRes = await User.findOne({
    where: { username: req.params.username },
    include: [Reservation],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(userWithNewRes);
});

// Display a Full Ticket
router.get("/users/:username/ticket/:reservationId", async (req, res) => {
  const ticket = await User.findOne({
    where: { username: req.params.username },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Reservation,
        where: { id: req.params.reservationId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: ReservedSeat,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              {
                model: Screening,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
        ],
      },
    ],
  });
  res.json(ticket);
});

module.exports = router;
