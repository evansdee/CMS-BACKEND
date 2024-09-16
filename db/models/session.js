"use strict";
const {  DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "sessions",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    codeAlt: {
      type: DataTypes.STRING
      
    },

    courseCode: {
      type: DataTypes.STRING
   
    },
    courseName: {
      type: DataTypes.STRING

    },
    endDate: {
      type: DataTypes.STRING
    },
    startDate: {
      type: DataTypes.STRING
    },
    newAmount: {
      type: DataTypes.STRING
    },
    renewAmount: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
 
  },
  { freezTableName: true, modelName: "sessions"}
);
