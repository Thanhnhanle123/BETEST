var express = require("express");
var router = express.Router();
const departmentEmployeeController = require(__path_controllers +
  "departmentEmployee.controller");
// GET /departments: Trả về danh sách tất cả các quan hệ giữa phòng ban và nhân viên.
router.get("/", departmentEmployeeController.getAll);
// POST /departments: Tạo mới một quan hệ giữa phòng ban và nhân viên..
router.post("/", departmentEmployeeController.add);
// GET /departments/{department_id}: Trả về danh sách tất cả nhân viên trong một phòng ban cụ thể.
router.get("/getDepartment/:department_id", departmentEmployeeController.getEmployeeByDepartmentId);
// GET /departments/{department_id}: Trả về danh sách tất cả nhân viên trong một phòng ban cụ thể.
router.get("/getEmployee/:employee_id", departmentEmployeeController.getDepartmentByEmployeeId);
// PUT /departments/{department_id}/{employee_id}: Cập nhật thông tin quan hệ giữa phòng ban và nhân viên.
router.put("/:department_id/:employee_id", departmentEmployeeController.update);
// DELETE /departments/{department_id}/{employee_id}: Xóa một quan hệ giữa phòng ban và nhân viên.
router.delete(
  "/:department_id/:employee_id",
  departmentEmployeeController.delete
);
module.exports = router;

