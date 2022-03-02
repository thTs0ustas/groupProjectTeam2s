"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      // auditorium_id: DataTypes.INTEGEG
      row_letter: DataTypes.STRING,
      seat_num: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Seat",
      tableName: "seats",
    }
  );
  return Seat;
};
