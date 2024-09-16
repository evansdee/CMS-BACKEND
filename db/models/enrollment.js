"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "enrollments",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.STRING,
    },
    bank: {
      type: DataTypes.STRING,
    },
    certificateNo: {
      type: DataTypes.STRING,
    },
    codeAlt: {
      type: DataTypes.STRING,
   
    },
    country: {
      type: DataTypes.STRING,
    },
    courseCode: {
      type: DataTypes.STRING,
  
    },
    courseName: {
      type: DataTypes.STRING,
   
    },
    dob: {
      type: DataTypes.STRING,
  
    },
    email: {
      type: DataTypes.STRING,
    },
    endDate: {
      type: DataTypes.STRING,
    },
    enrollDate: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
   
    },
    fullName: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
  
    },
    gsm: {
      type: DataTypes.STRING,
   
    },
    isRenewal: {
      type: DataTypes.BOOLEAN,
    },
    isSignature: {
      type: DataTypes.BOOLEAN,
    },
    lastName: {
      type: DataTypes.STRING,
  
    },
    lga: {
      type: DataTypes.STRING,
    },
    marital: {
      type: DataTypes.STRING,
    },
    means: {
      type: DataTypes.STRING,
    },
    meansId: {
      type: DataTypes.STRING,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
  
    },
    printStatus: {
      type: DataTypes.BOOLEAN,
    },
    startDate: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    stateReside: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  },
  { freezTableName: true, modelName: "enrollments" }
);
