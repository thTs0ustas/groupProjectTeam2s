const db = require("../../../models");
const { User } = db.sequelize.models;

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.destroy();
    return res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = deleteUser;
