const express = require("express");

const validator = require("../middlewares/validator");
const userSchema = require("../schemas/user-schema");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/", userController.showAll);

router.post("/", validator(userSchema), userController.create);

router.post("/login", userController.login);

router.get("/:id(\\d+)", userController.showOne);

module.exports = router;
