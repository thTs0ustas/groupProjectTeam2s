const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../models");
const { Reservation, User, Screening } = db.sequelize.models;

// User Reservations for a screening
router.get("/users/:id", async (req, res) => {
  const reservation = await User.findOne(
    {
      include: {
        model: Reservation,
        where: {
          [Op.and]: [
            { user_id: req.params.id },
            { screening_id: req.query.screening },
          ],
        },
      },
    },
    { include: User }
  );
  res.json(reservation);
});

// All user Reservations
router.get("/users/:id/all", async (req, res) => {
  const reservation = await User.findByPk(req.params.id, {
    include: {
      model: Reservation,
    },
  });
  res.json(reservation);
});

// Screening Reservations
router.get("/screenings/:id", async (req, res) => {
  const reservation = await Reservation.findAll({
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
    include: Reservation,
  });
  res.json(userWithNewRes);
});

module.exports = router;
