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
