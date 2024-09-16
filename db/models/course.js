"use strict";
const {  DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "courses",
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
  
    certImg: {
      type: DataTypes.STRING,
    },
    codeAlt: {
      type: DataTypes.STRING,
   
    },
    count: {
      type: DataTypes.STRING,
    },
    courseCode: {
      type: DataTypes.STRING,
   
    },
    courseName: {
      type: DataTypes.STRING,
     
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    newAmount: {
      type: DataTypes.STRING,
    },
    renewAmount: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
  }
  ,
  { freezTableName: true, modelName: "courses" }
);
