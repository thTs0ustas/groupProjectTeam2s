const db = require("../models");
const { Seat } = db.sequelize.models;
const getSeat = async (req, res) => {
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
};

module.exports = { getSeat };
