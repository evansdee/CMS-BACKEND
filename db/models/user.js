"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../../config/database");
const AppError = require("../../utils/appError");

module.exports = sequelize.define(
  "users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'role cannot be null'
        },
        notEmpty:{
          msg:"role cannot be empty"
        }
      }
    },
    otp: {
      type: DataTypes.STRING,
    
    },
    recognizedDevices: {
      type: DataTypes.JSON,
    
    },
    otpExpires: {
      type: DataTypes.DATE,

    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'email cannot be null'
        },
        notEmpty:{
          msg:"email cannot be empty"
        },
        isEmail:{
          msg:"Invaid email id"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'password cannot be null'
        },
        notEmpty:{
          msg:"password cannot be empty"
        },
      }
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {

        if(this.password.length <= 5) throw new AppError("Password must be greater than 7",400)
        if (value === this.password) {
          const hashpassword = bcrypt.hashSync(value, 10);

          this.setDataValue("password", hashpassword);
        } else {
          throw new AppError("Password do not match",400);
        }
      },
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
  { freezTableName: true, modelName: "users", paranoid: true }
);
