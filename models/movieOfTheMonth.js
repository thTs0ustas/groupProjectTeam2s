"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize) => {
  class MovieOfTheMonth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieOfTheMonth.belongsTo(models.Movie, {
        foreignKey: {
          name: "movie_id",
        },
      });
      MovieOfTheMonth.belongsTo(models.User, {
        foreignKey: {
          name: "admin_id",
        },
      });

      MovieOfTheMonth.hasMany(models.Screening, {
        foreignKey: {
          name: "movies_month_id"
        }
      })

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
