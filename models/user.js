"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.MovieOfTheMonth, {
        foreignKey: {
          name: "admin_id",
        },
      });
      User.belongsToMany(models.Movie, {
        as: "movies_reviewed",
        through: models.Review,
        foreignKey: {
          name: "user_id",
        },
      });
      User.hasMany(models.Reservation, {
        foreignKey: { name: "user_id", allowNull: false },
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      address: DataTypes.STRING,
      access_token: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          is: /^\S+@\S+\.\S+$/,
        },
      },
      isMember: DataTypes.BOOLEAN,
      postal: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
