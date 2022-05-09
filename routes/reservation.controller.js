const express = require("express");

const { Op } = require("sequelize");
const router = express.Router();
const db = require("../models");
const { Reservation, User, Seat, Screening, ReservedSeat, MovieOfTheMonth, Movie } = db.sequelize.models;

// User Reservations for a screening
router.get("/users/:id", async (req, res) => {
  const reservation = await User.findOne(
    {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Reservation,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          [Op.and]: [{ user_id: req.params.id }, { screening_id: req.query.screening }],
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
  const user = await User.findOne({ where: { id: req.params.id } });

  // const price = req.body.price
  const reservation = await user.createReservation({
    screening_id: req.body.data.screening_id,
    total_cost: req.body.data.price,
    purchase_date: new Date(),
  });

  // Create a new reserved seat for each seat in the reservation
  const resToSeats = req.body.data.seats.map((seat) =>
    reservation.createReservedSeat({
      reservation_id: reservation.id,
      cost: seat.cost,
      discount_type: seat.discount_type,
      seats_id: seat.id,
      screening_id: seat.screening_id,
    })
  );

  await Promise.allSettled(resToSeats);

  const userWithNewRes = await User.findOne({
    where: { id: req.params.id },
    attributes: ["id", "first_name", "last_name"],
    include: [
      {
        model: Reservation,
        where: { id: reservation.id },
        attributes: ["id", "purchase_date", "total_cost"],
        include: [Screening],
      },
    ],
  });

  const reservedSeats = await ReservedSeat.findAll({
    where: { reservation_id: reservation.id },
    include: [{ model: Seat, attributes: { exclude: ["createdAt", "updatedAt"] } }],
    attributes: ["id", "cost", "discount_type"],
  });

  res.json({ userWithNewRes, reservedSeats });
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

router.get("/history/:id", async (req, res) => {
  const history = await User.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: Reservation,
        attributes: ["id", "purchase_date", "total_cost"],
        include: [
          {
            model: Screening,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
              model: MovieOfTheMonth,
              attributes: { exclude: ["createdAt", "updatedAt", "movie_id", "admin_id"] },
              include: {
                model: Movie,
                attributes: { exclude: ["createdAt", "updatedAt", "id"] },
              },
            },
          },
        ],
      },
    ],
  });
  res.json(history);
});

module.exports = router;
