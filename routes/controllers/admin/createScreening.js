const db = require("../../../models");
const { Screening, MovieOfTheMonth, Movie } = db.sequelize.models;
const moment = require("moment");

const createScreening = async (req, res) => {
  const values = req.body;
  const newScreeningData = {};
  newScreeningData.movies_month_id = values.movie_id;
  newScreeningData.auditorium_id = values.auditorium_id;
  newScreeningData.movie_starts = moment(`${values.movie_date} ${values.movie_starts}`, "YYYY-MM-DD HH:mm").format();
  newScreeningData.movie_ends = moment(`${values.movie_date} ${values.movie_ends}`, "YYYY-MM-DD HH:mm").format();
  newScreeningData.movie_date = moment(values.movie_date).format();

  const newScreening = await Screening.create({
    ...newScreeningData,
  });
  const returnedData = await Screening.findAll({
    where: {
      id: newScreening.id,
    },
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

  res.json(returnedData);
};

module.exports = createScreening;
