var   express              = require("express");
var   router               = express.Router();
const departmentController       = require(__path_controllers + "department.controller");
// GET /departments: Trả về danh sách tất cả các phòng ban.
router.get('/', departmentController.getAll);

module.exports = router;