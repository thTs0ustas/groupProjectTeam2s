'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seats.hasOne(models.ReservedSeats, {
        foreignKey: {
          name: "seats_id"
        }
      });
      Seats.belongsTo(models.Auditorium, {
        foreignKey: {
          name: "auditorium_id"
        }
      })
    }
  }
  Seats.init({
    // auditorium_id: DataTypes.INTEGEG
    row_letter: DataTypes.STRING,
    seat_num: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Seats",
    tableName: "seats",
  });
  return Seats;
};