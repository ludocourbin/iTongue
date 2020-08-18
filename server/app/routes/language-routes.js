const express = require("express");

const languageController = require("../controllers/language-controller");

const router = express.Router();

router.get("/", languageController.getAll);

module.exports = router;
