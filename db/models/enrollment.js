"use strict";
const {  DataTypes } = require("sequelize");
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
    fullName: {
      type: DataTypes.STRING,
    }, 
    address: {
      type: DataTypes.STRING
    },
    bank: {
      type: DataTypes.STRING
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
    country: {
      type: DataTypes.STRING
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
    dob: {
      type: DataTypes.STRING
      ,
      allowNull:false,
      validate:{
        notNull:{
          msg:'date of birth cannot be null'
        },
        notEmpty:{
          msg:"date of birth cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING
    },
    endDate: {
      type: DataTypes.STRING
    },
    enrollDate: {
      type: DataTypes.STRING
    },
    fisrtName: {
      type: DataTypes.STRING
      ,
      allowNull:false,
      validate:{
        notNull:{
          msg:'first Name cannot be null'
        },
        notEmpty:{
          msg:"first Name cannot be empty"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'gender cannot be null'
        },
        notEmpty:{
          msg:"gender cannot be empty"
        }
      }
    },
    gsm: {
      type: DataTypes.STRING,
      
      allowNull:false,
      validate:{
        notNull:{
          msg:'Phone number cannot be null'
        },
        notEmpty:{
          msg:"Phone number cannot be empty"
        }
      }
    },
    isRenewal: {
      type: DataTypes.BOOLEAN
    },
    lastName: {
      type: DataTypes.STRING
      ,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Last Name cannot be null'
        },
        notEmpty:{
          msg:"Last Name cannot be empty"
        }
      }
    },
    lga: {
      type: DataTypes.STRING
    },
    marital: {
      type: DataTypes.STRING
    },
    means: {
      type: DataTypes.STRING
    },
    meansId: {
      type: DataTypes.STRING
    },
    middleName: {
      type: DataTypes.STRING
    },
    startDate: {
      type: DataTypes.STRING
    },
    photo: {
      type: DataTypes.STRING,
      
      allowNull:false,
      validate:{
        notNull:{
          msg:'photo cannot be null'
        },
        notEmpty:{
          msg:"photo cannot be empty"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    certificateNo: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    stateReside: {
      type: DataTypes.STRING
    },
    isSignature: {
      type: DataTypes.BOOLEAN
    },
    printStatus: {
      type: DataTypes.BOOLEAN
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
  { freezTableName: true, modelName: "enrollments", paranoid: true }
);
