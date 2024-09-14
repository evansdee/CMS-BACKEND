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
    count: {
      type: DataTypes.STRING
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    newAmount: {
      type: DataTypes.STRING
    },
    renewAmount: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING,
    },
    certImg: {
      type: DataTypes.STRING,
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
  { freezTableName: true, modelName: "courses", paranoid: true }
);
