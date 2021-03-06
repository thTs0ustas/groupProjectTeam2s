"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("seats", {
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
      row_letter: {
        type: Sequelize.STRING,
      },
      seat_num: {
        type: Sequelize.INTEGER,
      },
      cost: { type: Sequelize.INTEGER },
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
    await queryInterface.dropTable("Seats");
  },
};
