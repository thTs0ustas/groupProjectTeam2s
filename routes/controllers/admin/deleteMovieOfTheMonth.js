const db = require("../../../models");
const { MovieOfTheMonth } = db.sequelize.models;
// delete MovieOfTheMonth from the database
const deleteMovieOfTheMonth = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movieOfTheMonth = await MovieOfTheMonth.findOne({
      where: { id: movieId },
    });
    if (!movieOfTheMonth) {
      return res.status(404).json({
        message: "MovieOfTheMonth not found",
      });
    }
    await movieOfTheMonth.destroy();
    return res.status(200).json({
      message: "MovieOfTheMonth deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = deleteMovieOfTheMonth;
