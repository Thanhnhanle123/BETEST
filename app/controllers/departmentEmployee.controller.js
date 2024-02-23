// Import required modules and files
const message = require("./common/message").message;

const DepartmentEmployeeModel = require(__path_models +
  "departmentEmployee.model");
const Constants = require(__path_commons + "constants.common");
const constants = new Constants();
module.exports.getAll = async (req, res) => {
  try {
    const departmentEmployees = await DepartmentEmployeeModel.findAll();
    if (departmentEmployees.length > 0)
      return message(res, 200, constants.success, departments);
    else return message(res, 200, constants.success, constants.dataNotFound);
  } catch (error) {
    return message(res, 500, constants.err, error);
  }
};

module.exports.getEmployeeByDepartmentId = async (req, res) => {
  const { department_id } = req.params;
  var param = { departmentId: department_id };
  var data = await getByParam(param, res);
  if (data.length > 0) {
    message(res, 200, constants.success, data);
  }
};

module.exports.getDepartmentByEmployeeId = async (req, res) => {
  const { employee_id } = req.params;
  var param = { employeeId: employee_id };
  var data = await getByParam(param, res);
  if (data.length > 0) {
    message(res, 200, constants.success, data);
  }
};

getByParam = async (param, res) => {
  try {
    const department = await DepartmentEmployeeModel.findAll({
      where: param,
    });
    if (!department || department.length == 0) {
      return message(res, 404, constants.error, constants.dataNotFound);
    }
    return department;
  } catch (error) {
    return message(res, 500, constants.err, error);
  }
};

module.exports.add = async (req, res) => {
  const departmentEmployeeData = req.body;
  if (
    !departmentEmployeeData.department_Id ||
    !departmentEmployeeData.employee_Id
  ) {
    return message(
      res,
      400,
      constants.err,
      constants.Require("departmentId and employeeId")
    );
  }

  try {
    const departmentEmployeeNew = await DepartmentEmployeeModel.create({
      departmentId: departmentEmployeeData.department_Id,
      employeeId: departmentEmployeeData.employee_Id,
    });
    return message(res, 201, constants.success, departmentEmployeeNew);
  } catch (error) {
    return message(res, 500, constants.err, error);
  }
};

module.exports.update = async (req, res) => {
  const departmentEmployeeData = req.body;
  const { department_id, employee_id } = req.params;
  if (
    !departmentEmployeeData.departmentId ||
    !departmentEmployeeData.employeeId
  ) {
    return message(
      res,
      400,
      constants.err,
      constants.Require("departmentId and employeeId")
    );
  }

  try {
    const departmentEmployee = await DepartmentEmployeeModel.findOne({
      where: {
        employeeId: employee_id,
        departmentId: department_id,
      },
    });
    if (!departmentEmployee || departmentEmployee.length == 0) {
      return message(res, 404, constants.error, constants.dataNotFound);
    }

    var dataUpdate = await departmentEmployee.update(departmentEmployeeData);
    return message(res, 200, constants.success, dataUpdate);
  } catch (error) {
    console.log(error);
    return message(res, 500, constants.err, error);
  }
};

module.exports.delete = async (req, res) => {
  const { department_id, employee_id } = req.params;

  try {
    const departmentEmployee = await DepartmentEmployeeModel.findOne({
      where: {
        employeeId: employee_id,
        departmentId: department_id,
      },
    });
    if (!departmentEmployee || departmentEmployee.length == 0) {
      return message(res, 404, constants.error, constants.dataNotFound);
    }

    // Delete the employee record
    await departmentEmployee.destroy();

    // Return success message
    return message(res, 200, constants.success, constants.deleteSuccess);
  } catch (error) {
    // Return error message
    return message(res, 500, constants.err, error);
  }
};
