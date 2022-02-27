'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Auditorium', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cinema_id: {
        type: Sequelize.INTEGER,
        require: true,
        references: {
          model: "cinemas",
          key: "id",
        },
      },
      hall_num: {
        type: Sequelize.INTEGER
      },
      total_seats: {
        type: Sequelize.INTEGER
      },
      free_seats: {
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
    await queryInterface.dropTable('Auditorium');
  }
};