"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      Seat.hasOne(models.ReservedSeat, {
        foreignKey: {
          name: "seats_id",
        },
      });
      Seat.belongsTo(models.Auditorium, {
        foreignKey: {
          name: "auditorium_id",
        },
      });
    }
  }
  Seat.init(
    {
      row_letter: DataTypes.STRING,
      seat_num: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Seat",
      tableName: "seats",
    }
  );
  return Seat;
};
