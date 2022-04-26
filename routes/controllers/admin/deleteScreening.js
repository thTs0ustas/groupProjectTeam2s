const db = require("../../../models");
const { Screening } = db.sequelize.models;
// delete screenings from the database
const deleteScreening = async (req, res) => {
  try {
    const { id } = req.params;

    const screening = await Screening.findOne({
      where: { id },
    });
    if (!screening) {
      return res.status(404).json({
        message: "Screening not found",
      });
    }
    await screening.destroy();
    return res.status(200).json({
      message: "Screening deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = deleteScreening;
