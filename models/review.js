"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    // static associate(models) {}
  }
  Review.init(
    {
      score: {
        type: DataTypes.INTEGER,
        min: 0,
        max: 5,
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
    }
  );
  return Review;
};
