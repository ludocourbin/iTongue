const express = require("express");

const languageController = require("../controllers/language-controller");

const router = express.Router();

router.get("/", languageController.getAll);
router.get("/", languageController.getOneByName);
router.get("/", languageController.getOneByCode);

module.exports = router;
