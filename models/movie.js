"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.hasMany(models.MovieOfTheMonth, {
        foreignKey: {
          name: "movie_id",
        },
      });
      Movie.belongsToMany(models.User, {
        as: "reviewed_by",
        through: models.Review,
        foreignKey: {
          name: "movie_id",
        },
      });
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      genre: DataTypes.STRING,
      // image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
      tableName: "movies",
    }
  );
  return Movie;
};
