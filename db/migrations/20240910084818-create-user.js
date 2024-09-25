'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', 
      {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.STRING
      },
      recognizedDevices: {
        type: Sequelize.JSONB, 
        defaultValue: [],
      },
      otp: {
        type: Sequelize.STRING, 
      },
      otpExpires: {
        type: Sequelize.DATE, 
      },
      email: {
        type: Sequelize.STRING,
        unique:true
      },
      password: {
        type: Sequelize.STRING
      },
   
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        type:Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};