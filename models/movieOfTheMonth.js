"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MovieOfTheMonth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieOfTheMonth.belongsTo(models.Movie);
      MovieOfTheMonth.belongsTo(models.User);
    }
  }
  MovieOfTheMonth.init(
    {
      // movie_id: DataTypes.INTEGER,
      // admin_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MovieOfTheMonth",
      tableName: "movies_of_the_month",
    }
  );
  return MovieOfTheMonth;
};
