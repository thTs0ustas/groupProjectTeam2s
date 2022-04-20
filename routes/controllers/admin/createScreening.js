const db = require("../../../models");
const { Screening } = db.sequelize.models;
const moment = require("moment");

const createScreening = async (req, res) => {
  const values = req.body.values;
  const newScreeningData = {};
  newScreeningData.movies_month_id = +values.movie_id;
  newScreeningData.auditorium_id = values.auditorium_id;
  newScreeningData.movie_starts = moment(
    `${values.movie_date} ${values.movie_starts}`,
    "YYYY-MM-DD HH:mm"
  ).format();
  newScreeningData.movie_ends = moment(
    `${values.movie_date} ${values.movie_ends}`,
    "YYYY-MM-DD HH:mm"
  ).format();
  newScreeningData.movie_date = moment(values.movie_date).format();
  console.log(newScreeningData);

  const newScreening = await Screening.create({
    ...newScreeningData,
  });

  res.status(204).json(newScreening);
};

module.exports = createScreening;
