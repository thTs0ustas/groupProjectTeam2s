"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auditorium extends Model {
    static associate(models) {
      Auditorium.belongsTo(models.Cinema, {
        foreignKey: {
          name: "cinema_id",
        },
      });
      Auditorium.hasMany(models.Screening, {
        foreignKey: {
          name: "auditorium_id",
        },
      });
    }
  }
  Auditorium.init(
    {
      // cinema_id: DataTypes.INTEGER,
      hall_num: DataTypes.INTEGER,
      total_seats: DataTypes.INTEGER,
      free_seats: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Auditorium",
      tableName: "auditorium",
    }
  );
  return Auditorium;
};
