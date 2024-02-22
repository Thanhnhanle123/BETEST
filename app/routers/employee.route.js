var   express              = require("express");
var   router               = express.Router();
const employeeController       = require(__path_controllers + "employee.controller");
router.post('/', employeeController.add);
router.get('/', employeeController.getAll);
router.put('/:id', employeeController.update);
router.get('/:id', employeeController.getById);
router.delete('/:id', employeeController.delete);
module.exports = router;