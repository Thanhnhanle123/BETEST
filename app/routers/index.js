var express = require("express");
var router = express.Router();

router.use("/employee", require("./employee.route"));
router.use("/department", require("./department.route"));

module.exports = router;