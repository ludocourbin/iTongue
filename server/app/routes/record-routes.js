const express = require("express");

const recordController = require("../controllers/record-controller");

const router = express.Router();

router.get("/", recordController.showAll);

module.exports = router;
