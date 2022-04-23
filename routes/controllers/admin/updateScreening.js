const db = require("../../../models");
const { Screening } = db.sequelize.models;
const moment = require("moment");

const updateScreening = async (req, res) => {
  const values = req.body.values;
  const updates = {};
  updates.movie_starts = moment(`${values.movie_date} ${values.movie_starts}`, "YYYY-MM-DD HH:mm").format();
  updates.movie_ends = moment(`${values.movie_date} ${values.movie_ends}`, "YYYY-MM-DD HH:mm").format();
  updates.movie_date = moment(values.movie_date).format();

  const screening = await Screening.update({ ...updates }, { where: { id: req.params.id } });
  res.json(screening);
};

module.exports = updateScreening;
