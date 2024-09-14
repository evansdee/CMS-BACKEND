'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseCode: {
        type: Sequelize.STRING
      },
      count: {
        type: Sequelize.INTEGER
      },
      codeAlt: {
        type: Sequelize.STRING
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue:false

      },
      courseName: {
        type: Sequelize.STRING
      },
      newAmount: {
        type: Sequelize.INTEGER
      },
      renewAmount: {
        type: Sequelize.INTEGER
      },
      certImg: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('courses');
  }
};