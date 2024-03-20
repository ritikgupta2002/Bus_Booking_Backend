'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      type: {
        type: Sequelize.ENUM("AC", "Regular","Sleeper","Deluxe"),
        defaultValue: "Regular",
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      operator: {
        type: Sequelize.STRING,
        allowNull:false
      },
      stationId: {
       type:Sequelize.INTEGER,
       references:{
        model: 'BusStations',
        key: 'id',
        as:'stationId',
       },
       onDelete: 'CASCADE',
       allowNull: false,
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
    await queryInterface.dropTable('Buses');
  }
};