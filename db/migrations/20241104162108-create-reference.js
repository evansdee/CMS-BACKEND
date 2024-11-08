'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('references',
      {
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
        address: {
          type: Sequelize.STRING,
        },
        amount: {
          type: Sequelize.STRING,
        },
      
        country: {
          type: Sequelize.STRING,
        },
      
        courseName: {
          type: Sequelize.STRING,
        },
        dob: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
      
        firstName: {
          type: Sequelize.STRING,
        },
     
        gender: {
          type: Sequelize.STRING,
        },
        gsm: {
          type: Sequelize.STRING,
        },
       
        lastName: {
          type: Sequelize.STRING,
        },
        lga: {
          type: Sequelize.STRING,
        },
        marital: {
          type: Sequelize.STRING,
        },
        means: {
          type: Sequelize.STRING,
        },
        meansId: {
          type: Sequelize.STRING,
        },
        middleName: {
          type: Sequelize.STRING,
        },
        
        refNumber:{
          type: Sequelize.STRING,

        },
        state: {
          type: Sequelize.STRING,
        },
        stateReside: {
          type: Sequelize.STRING,
        },
        refStatus: {
          type: Sequelize.BOOLEAN,
          defaultValue: null,
        },
      }
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('references');
  }
};