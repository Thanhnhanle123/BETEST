const { DataTypes } = require("sequelize");
const sequelize = require(__path_configs + "database"); 

const DepartmentEmployee = sequelize.define(
  "DepartmentEmployee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      
    }
  },
  {
    timestamps: false, // Tắt tự động tạo createdAt và updatedAt
  }
);

module.exports = DepartmentEmployee;
