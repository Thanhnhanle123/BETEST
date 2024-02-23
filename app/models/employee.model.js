const { DataTypes } = require("sequelize");
const sequelize = require(__path_configs + "database"); // Make sure this path is correct
const DepartmentEmployee = require('./departmentEmployee.model');

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
    timestamps: false, // Turn off auto timestamps
  }
);

Employee.hasMany(DepartmentEmployee, { foreignKey: 'employeeId' });

module.exports = Employee;