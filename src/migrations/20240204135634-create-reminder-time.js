'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReminderTimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      Reminder: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      email:{
        type:Sequelize.STRING,
        allowNull:false
      },
      STATUS: {
        type: Sequelize.STRING,
        defaultValue:"Pending"
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
    await queryInterface.dropTable('ReminderTimes');
  }
};