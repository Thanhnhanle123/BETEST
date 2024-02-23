var   express              = require("express");
var   router               = express.Router();
const departmentController       = require(__path_controllers + "department.controller");
// GET /departments: Trả về danh sách tất cả các phòng ban.
router.get('/', departmentController.getAll);
// GET /departments/{id}: Trả về thông tin của một phòng ban cụ thể dựa trên ID.
router.get('/:id', departmentController.getById);
// POST /departments: Tạo mới một phòng ban.
router.post('/', departmentController.add);
// PUT /departments/{id}: Cập nhật thông tin của một phòng ban cụ thể.
router.put('/:id', departmentController.update);
// DELETE /departments/{id}: Xóa một phòng ban cụ thể.
router.delete('/:id', departmentController.delete);
module.exports = router;