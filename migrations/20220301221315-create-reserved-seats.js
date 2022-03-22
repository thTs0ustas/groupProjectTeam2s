"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reservedSeats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reservation_id: {
        type: Sequelize.INTEGER,
        require: true,
        references: {
          model: "reservations",
          key: "id",
        },
      },
      screening_id: {
        type: Sequelize.INTEGER,
        require: true,
        references: {
          model: "Screenings",
          key: "id",
        },
      },
      seats_id: {
        type: Sequelize.INTEGER,
        require: true,
        references: {
          model: "seats",
          key: "id",
        },
      },
      discount_type: {
        type: Sequelize.STRING,
      },
      cost: {
        type: Sequelize.INTEGER,
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
  async down(queryInterface) {
    await queryInterface.dropTable("ReservedSeats");
  },
};
