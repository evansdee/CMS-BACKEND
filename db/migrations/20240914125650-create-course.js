"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("courses", {
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
      certImg: {
        type: Sequelize.STRING,
      },
      codeAlt: {
        type: Sequelize.STRING,
      },
      count: {
        type: Sequelize.INTEGER,
      },
      courseCode: {
        type: Sequelize.STRING,
      },
      courseName: {
        type: Sequelize.STRING,
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      newAmount: {
        type: Sequelize.INTEGER,
      },
      renewAmount: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("courses");
  },
};
