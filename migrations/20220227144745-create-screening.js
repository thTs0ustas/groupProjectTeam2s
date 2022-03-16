"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("screenings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      auditorium_id: {
        type: Sequelize.INTEGER,
        require: true,
        references: {
          model: "auditorium",
          key: "id",
        },
      },
      movies_month_id: {
        type: Sequelize.INTEGER,
        require: true,
        references: {
          model: "movies_of_the_month",
          key: "id",
        },
      },
      movie_starts: {
        type: Sequelize.DATE,
      },
      movie_ends: {
        type: Sequelize.DATE,
      },
      movie_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Screenings");
  },
};
