const db = require("../../../models");
const { Movie, MovieOfTheMonth, Screening } = db.sequelize.models;

const getScreenings = async (req, res) => {
  const screenings = await Screening.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: MovieOfTheMonth,
        attributes: ["id"],
        include: {
          model: Movie,
          attributes: ["id", "title", "duration", "genre"],
        },
      },
    ],
  });
  res.json(screenings);
};

module.exports = getScreenings;
