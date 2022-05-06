const db = require("../../../models");
const { Screening, MovieOfTheMonth, Movie } = db.sequelize.models;
const moment = require("moment");

const updateScreening = async (req, res) => {
  const values = req.body;
  const updates = {};
  updates.movie_starts = moment(`${values.movie_date} ${values.movie_starts}`, "YYYY-MM-DD HH:mm").format();
  updates.movie_ends = moment(`${values.movie_date} ${values.movie_ends}`, "YYYY-MM-DD HH:mm").format();
  updates.movie_date = moment(values.movie_date).format();

  await Screening.update({ ...updates }, { where: { id: req.params.screeningId } });
  const screening = await Screening.findAll({
    where: { id: req.params.screeningId },
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

  res.json(screening);
};

module.exports = updateScreening;
