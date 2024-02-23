const { DataTypes } = require("sequelize");
const sequelize = require(__path_configs + "database"); // File cấu hình kết nối
const DepartmentEmployee = require('./departmentEmployee.model');

const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    timestamps: false, // Tắt tự động tạo createdAt và updatedAt
  }
);
Department.hasMany(DepartmentEmployee, { foreignKey: 'departmentId' });

module.exports = Department;
