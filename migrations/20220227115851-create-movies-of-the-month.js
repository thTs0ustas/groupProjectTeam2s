"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movies_of_the_month", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        require: true,
        references: {
          model: "movies",
          key: "id",
        },
      },
      admin_id: {
        type: Sequelize.INTEGER,
        // require: true,
        references: {
          model: "users",
          key: "id",
        },
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
    await queryInterface.dropTable("movies_of_the_month");
  },
};
