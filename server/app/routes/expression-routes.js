const express = require("express");

const expressionController = require("../controllers/expression-controller");

const router = express.Router();

router.get("/", expressionController.getAll);
router.get("/:id([0-9]+)", expressionController.todo);

module.exports = router;
