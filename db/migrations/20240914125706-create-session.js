"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sessions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      codeAlt: {
        type: Sequelize.STRING,
      },
      courseCode: {
        type: Sequelize.STRING,
      },
      courseName: {
        type: Sequelize.STRING,
      },
      endDate: {
        type: Sequelize.STRING,
      },
      newAmount: {
        type: Sequelize.STRING,
      },
      renewAmount: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sessions");
  },
};
