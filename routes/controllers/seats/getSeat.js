const db = require("../../../models");
const { Seat } = db.sequelize.models;

const getSeat = async (req, res) => {
  const reservedSeats = await Seat.findAll({
    where: { auditorium_id: req.params.auditorium_id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(reservedSeats);
};
module.exports = { getSeat };
