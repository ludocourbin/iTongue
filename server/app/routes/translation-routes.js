const express = require("express");

const translationController = require("../controllers/translation-controller");

const router = express.Router();

router.get("/", translationController.getAll);
router.get("/:id([0-9]+)", translationController.getOneById);

module.exports = router;
