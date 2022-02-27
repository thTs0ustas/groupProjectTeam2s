"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MovieOfTheMonth, {
        foreignKey: {
          name: "admin_id",
        },
      }),
        User.belongsToMany(models.Movie, {
          through: models.Review,
          // as: "movies_reviewed",
          foreignKey: {
            name: "user_id",
          },
        });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      address: DataTypes.STRING,
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
