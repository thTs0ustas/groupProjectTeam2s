"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        require: true,
      },
      first_name: {
        type: Sequelize.STRING,
        require: true,
      },
      last_name: {
        type: Sequelize.STRING,
        require: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      postal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        default: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
