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
router.post("/users/:id/new", async (req, res) => {
  // const screening = await Screening.findByPk(req.body.screening_id);
  const user = await User.findByPk(req.params.id);
  await user.createReservation({
    // user_id: req.params.id,
    screening_id: req.body.screening_id,
    total_cost: 15,
    purchase_date: new Date(),
  });
  const userWithNewRes = await User.findByPk(req.params.id, {
    include: [Reservation, ReservedSeat],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(userWithNewRes);
});

// Display a Full Ticket
router.get("/users/:id/ticket", async (req, res) => {
  console.log(req.params.id);
  const ticket = await User.findByPk(req.params.id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Reservation,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: ReservedSeat,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Screening,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      },
    ],
  });
  res.json(ticket);
});

module.exports = router;
