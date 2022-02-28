"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    static associate(models) {
      Cinema.hasMany(models.Auditorium, {
        foreignKey: {
          name: "cinema_id",
        },
      });
    }
  }
  Cinema.init(
    {
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cinema",
      tableName: "cinemas",
    }
  );
  return Cinema;
};
