"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "references",
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
  
    country: {
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
  
    firstName: {
      type: DataTypes.STRING,
   
    },
  
    gender: {
      type: DataTypes.STRING,
  
    },
    gsm: {
      type: DataTypes.STRING,
   
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
    refNumber: {
      type: DataTypes.STRING,
  
    },
   
    state: {
      type: DataTypes.STRING,
    },
    stateReside: {
      type: DataTypes.STRING,
    },
    refStatus: {
      type: DataTypes.BOOLEAN,
    },
  },
  { freezTableName: true, modelName: "references" }
);
