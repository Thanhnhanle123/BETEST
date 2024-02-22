// Import required modules and files
const message = require("./common/message").message;
const funcCommon = require("./common/funcCommon");
const EmployeeModel = require(__path_models + "employee.model");
const Constants = require(__path_commons + "constants.common");
const constants = new Constants();
// Function to add a new employee record
module.exports.add = async (req, res) => {
  const employeeData = req.body; // Assuming the request body contains the employee data

  // Check if required fields are provided
  if (!employeeData.email || !employeeData.name) {
    return message(
      res,
      400,
      constants.err,
      constants.Require("email and name")
    );
  }

  // Validate email and phone number
  if (!funcCommon.isValidEmail(employeeData.email)) {
    return message(res, 400, constants.err, constants.Invalid("email"));
  } else if (!funcCommon.isValidPhone(employeeData.phone)) {
    return message(res, 400, constants.err, constants.Invalid("phone"));
  }

  // Create a new employee model
  var employeeModel = new EmployeeModel();

  try {
    // Generate employee code
    this.code = "00001-EMP";

    // Find the newest record
    if (
      employeeData.code == null ||
      employeeData.code == undefined ||
      employeeData.code == ""
    ) {
      const newestRecord = await EmployeeModel.findOne({
        order: [["id", "DESC"]],
      });

      if (newestRecord) {
        this.code = getNumFormString(newestRecord.toJSON().code);
      }
    } else {
      this.code = employeeData.code;
    }
    // Set employee model data
    employeeModel.code = this.code;
    employeeModel.name = employeeData.name;
    employeeModel.phone = employeeData.phone;
    employeeModel.email = employeeData.email;
    employeeModel.sex = employeeData.sex;
    employeeModel.avatar = Buffer.from(employeeData.avatar, "base64");

    // Create a new employee record
    const newEmployee = await EmployeeModel.create(employeeModel.dataValues);

    // Return success message
    return message(res, 201, constants.success, newEmployee);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};
getNumFormString = (str) => {
  if (typeof str == "string") {
    var num = str.match(/\d+/g);
    if (num) {
      for (let i = 0; i < num.length; i++) {
        var strNew = (parseInt(num[i]) + 1).toString();
        var len = num[i].length - strNew.length;
        for (let index = 0; index < len; index++) {
          strNew = "0" + strNew;
        }
        str = str.replace(num[i], strNew);
      }
      return str;
    } else {
      return str;
    }
  }
};

// Function to get all employee records
module.exports.getAll = async (req, res) => {
  try {
    // Find all employee records
    const employees = await EmployeeModel.findAll();
    if (employees.length > 0)
      // Return success message with employee records
      return message(res, 200, constants.success, employees);
    else return message(res, 200, constants.success, constants.dataNotFound);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};

// Function to update an employee record by ID
module.exports.update = async (req, res) => {
  const employeeData = req.body; // Assuming the request body contains the updated employee data
  const { id } = req.params; // Assuming the employee id is passed as a route parameter

  // Check if required fields are provided
  if (!employeeData.email || !employeeData.name) {
    return message(
      res,
      400,
      constants.err,
      constants.Require("email and name")
    );
  }

  // Validate email and phone number
  if (!funcCommon.isValidEmail(employeeData.email)) {
    return message(res, 400, constants.err, constants.Invalid("email"));
  } else if (!funcCommon.isValidPhone(employeeData.phone)) {
    return message(res, 400, constants.err, constants.Invalid("phone"));
  }

  try {
    // Find the employee record by id
    const employeeRecord = await EmployeeModel.findByPk(id);

    // If no employee record is found with the given id, return an error
    if (!employeeRecord) {
      return message(res, 404, constants.error, constants.dataNotFound);
    }

    // Update the employee record with the new data
    await employeeRecord.update(employeeData);

    // Get the updated employee record
    const updatedEmployeeRecord = await EmployeeModel.findByPk(id);

    // Return success message with updated employee record
    return message(res, 200, constants.success, updatedEmployeeRecord);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};

// Function to get an employee record by ID
module.exports.getById = async (req, res) => {
  const { id } = req.params; // Assuming the employee id is passed as a route parameter

  try {
    // Find the employee record by id
    const employeeRecord = await EmployeeModel.findByPk(id);

    // If no employee record is found with the given id, return an error
    if (!employeeRecord) {
      return message(res, 404, constants.error, constants.dataNotFound);
    }

    // Return success message with employee record
    return message(res, 200, constants.success, employeeRecord);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params; // Assuming the employee id is passed as a route parameter

  try {
    // Find the employee record by id
    const employeeRecord = await EmployeeModel.findByPk(id);

    // If no employee record is found with the given id, return an error
    if (!employeeRecord) {
      return message(res, 404, constants.error, constants.dataNotFound);
    }

    // Delete the employee record
    await employeeRecord.destroy();

    // Return success message
    return message(res, 200, constants.success, constants.deleteSuccess);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};
