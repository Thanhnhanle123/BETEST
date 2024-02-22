const { DataTypes } = require("sequelize");
const sequelize = require(__path_configs + "database"); // File cấu hình kết nối
const bcrypt = require('bcryptjs');

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    email: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    phone: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    sex: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    avatar: {
      type: DataTypes.BLOB,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    timestamps: false, // Tắt tự động tạo createdAt và updatedAt
  }
);

module.exports = Employee;
