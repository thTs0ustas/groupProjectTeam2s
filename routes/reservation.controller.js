const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../models");
const { Reservation, User, Screening } = db.sequelize.models;

// User Reservations for a screening
router.get("/users/:id", async (req, res) => {
  const reservation = await Reservation.findOne(
    {
      where: {
        [Op.and]: [
          { user_id: req.params.id },
          { screening_id: req.query.screening },
        ],
      },
    },
    { include: User }
  );
  res.json(reservation);
});

// All user Reservations
router.get("/users/:id/all", async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id, {
    include: {
      model: User,
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

module.exports = router;
