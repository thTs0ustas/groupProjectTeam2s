'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReservedSeats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reservation_id: {
        type: Sequelize.INTEGER,
        require: true,
        reference: {
          model: "Reservation",
          key: "id"
        }
      },
      seats_id: {
        type: Sequelize.INTEGER,
        require: true,
        reference: {
          model: "Seats",
          key: "id"
        }
      },
      discount_type: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ReservedSeats');
  }
};
