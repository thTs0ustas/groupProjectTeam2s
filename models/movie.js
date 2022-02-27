"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    },
    {
      sequelize,
      modelName: "Movie",
      tableName: "movies",
    }
  );
  return Movie;
};
