const express = require("express");
const dataController = require("../controller/data-controller");

const router = express.Router();

router.route("/data").get(dataController.getData);

module.exports = router;
