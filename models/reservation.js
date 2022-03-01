"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.User, {
        foreignKey: { name: "user_id", allowNull: false },
      });
      Reservation.belongsTo(models.Screening, {
        foreignKey: { name: "screening_id", allowNull: false },
      });
    }
  }
  Reservation.init(
    {
      purchase_date: DataTypes.DATE,
      total_cost: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Reservation",
      tableName: "reservations",
    }
  );
  return Reservation;
};
