"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReservedSeat extends Model {
    static associate(models) {
      ReservedSeat.belongsTo(models.Seat, {
        foreignKey: {
          name: "seats_id",
        },
      });
      ReservedSeat.belongsTo(models.Reservation, {
        foreignKey: {
          name: "reservation_id",
          allowNull: false,
        },
      });
    }
  }
  ReservedSeat.init(
    {
      // reservation_id: DataTypes.INTEGEG
      // seats_id: DataTypes.INTEGEG
      discount_type: DataTypes.STRING,
      cost: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ReservedSeat",
      tableName: "reservedseats",
    }
  );
  return ReservedSeat;
};
