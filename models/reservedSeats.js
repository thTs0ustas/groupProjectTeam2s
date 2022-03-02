'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReservedSeats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReservedSeats.belongsTo(models.Seats, {
        foreignKey: {
          name: "seats_id"
        }
      });
      ReservedSeats.belongsTo(models.Reservation, {
        foreignKey: {
          name: "reservation_id",
        }
      });
    }
  }
  ReservedSeats.init({
    // reservation_id: DataTypes.INTEGEG
    // seats_id: DataTypes.INTEGEG
    discount_type: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReservedSeats',
    tableName: "reservedseats",
  });
  return ReservedSeats;
};