const db = require("../../../models");
const { Movie, MovieOfTheMonth } = db.sequelize.models;

const getMoviesOfTheMonth = async (req, res) => {
  const movies = await MovieOfTheMonth.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Movie,
        attributes: ["id", "title"],
      },
    ],
  });
  res.json(movies);
};

module.exports = getMoviesOfTheMonth;
