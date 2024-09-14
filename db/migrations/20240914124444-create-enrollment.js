'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('enrollments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      codeAlt: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      courseCode: {
        type: Sequelize.STRING
      },
      courseName: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.STRING
      },
      enrollDate: {
        type: Sequelize.STRING
      },
      fisrtName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      gsm: {
        type: Sequelize.STRING
      },
      isRenewal: {
        type: Sequelize.BOOLEAN,
        defaultValue:false

      },
      lastName: {
        type: Sequelize.STRING
      },
      lga: {
        type: Sequelize.STRING
      },
      marital: {
        type: Sequelize.STRING
      },
      means: {
        type: Sequelize.STRING
      },
      meansId: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:false

      },
      certificateNo: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      stateReside: {
        type: Sequelize.STRING
      },
      isSignature: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      printStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue:false

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
    await queryInterface.dropTable('enrollments');
  }
};