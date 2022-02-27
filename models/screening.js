'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Screening extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Screening.belongsTo(models.Auditorium, {
        foreignKey: {
          name: "auditorium_id",
        },
      });
      Screening.belongsTo(models.MovieOfTheMonth,  {
        foreignKey: {
          name: "movies_month_id",
        },
      });
    }
  }
  Screening.init({
    // auditorium_id: DataTypes.INTEGEG
    // movies_month_id: DataTypes.INTEGEG
    movie_starts: DataTypes.DATE,
    movie_ends: DataTypes.DATE,
    movie_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Screening',
    tableName: "screenings",
  });
  return Screening;
};