"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize) => {
  class MovieOfTheMonth extends Model {
    static associate(models) {
      MovieOfTheMonth.belongsTo(models.Movie, {
        foreignKey: {
          name: "movie_id",
        },
      });

      MovieOfTheMonth.hasMany(models.Screening, {
        foreignKey: {
          name: "movies_month_id",
        },
        onDelete: "CASCADE",
        hooks: true,
      });
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
