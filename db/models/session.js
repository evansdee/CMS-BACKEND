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
      ,
      allowNull:false,
      validate:{
        notNull:{
          msg:'cannot be null'
        },
        notEmpty:{
          msg:"cannot be empty"
        }
      }
    },

    courseCode: {
      type: DataTypes.STRING
      ,
      allowNull:false,
      validate:{
        notNull:{
          msg:'cannot be null'
        },
        notEmpty:{
          msg:"cannot be empty"
        }
      }
    },
    courseName: {
      type: DataTypes.STRING
      ,
      allowNull:false,
      validate:{
        notNull:{
          msg:'course name cannot be null'
        },
        notEmpty:{
          msg:"course name cannot be empty"
        }
      }
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
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  { freezTableName: true, modelName: "sessions", paranoid: true }
);
