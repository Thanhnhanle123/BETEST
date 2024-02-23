// Import required modules and files
const message = require("./common/message").message;
const funcCommon = require("./common/funcCommon");
const DepartmentModel = require(__path_models + "department.model");
const Constants = require(__path_commons + "constants.common");
const constants = new Constants();
// Function to get all department records
module.exports.getAll = async (req, res) => {
  try {
    // Find all department records
    const departments = await DepartmentModel.findAll();
    // Return success message with employee records
    if (departments.length > 0)
      // Return success message with employee records
      return message(res, 200, constants.success, departments);
    else return message(res, 200, constants.success, constants.dataNotFound);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};

module.exports.getById = async (req, res) => {
  const { id } = req.params; // Assuming the employee id is passed as a route parameter

  try {
    // Find the employee record by id
    const departmentModel = await DepartmentModel.findByPk(id);

    // If no employee record is found with the given id, return an error
    if (!departmentModel) {
      return message(res, 404, constants.error, constants.dataNotFound);
    }

    // Return success message with employee record
    return message(res, 200, constants.success, departmentModel);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};

module.exports.add = async (req, res) => {
  const departmentData = req.body; // Assuming the request body contains the employee data

  // Check if required fields are provided
  if (!departmentData.code || !departmentData.name) {
    return message(
      res,
      400,
      constants.err,
      constants.Require("code and name")
    );
  }

  var departmentModel = new DepartmentModel();

  try {
    // Set department model data
    departmentModel.code = departmentData.code;
    departmentModel.name = departmentData.name;

    // Create a new employee record
    const department = await DepartmentModel.findOne(
      {
        where: {
          code: departmentData.code,
          name: departmentData.name,
        },
      }
    );
    if (!department || department.length == 0) {
      const departmentNew = await DepartmentModel.create(departmentModel.dataValues);
      return message(res, 201, constants.success, departmentNew);
    }
    return message(res, 201, constants.success, department);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};

module.exports.update = async (req, res) => {
  const departmentData = req.body; // Assuming the request body contains the updated employee data
  const { id } = req.params; // Assuming the employee id is passed as a route parameter

  // Check if required fields are provided
  if (!departmentData.code || !departmentData.name) {
    return message(
      res,
      400,
      constants.err,
      constants.Require("code and name")
    );
  }

  try {
    // Find the employee record by id
    const departmentDataRecord = await DepartmentModel.findByPk(id);

    // If no employee record is found with the given id, return an error
    if (!departmentDataRecord) {
      return message(res, 404, constants.error, constants.dataNotFound);
    }

    // Update the employee record with the new data
    await departmentDataRecord.update(departmentData);

    // Get the updated employee record
    const updatedDepartmentRecord = await DepartmentModel.findByPk(id);

    // Return success message with updated employee record
    return message(res, 200, constants.success, updatedDepartmentRecord);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params; // Assuming the employee id is passed as a route parameter

  try {
    // Find the employee record by id
    const departmentRecord = await DepartmentModel.findByPk(id);

    // If no employee record is found with the given id, return an error
    if (!departmentRecord) {
      return message(res, 404, constants.error, constants.dataNotFound);
    }

    // Delete the employee record
    await departmentRecord.destroy();

    // Return success message
    return message(res, 200, constants.success, constants.deleteSuccess);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};
