const express = require("express");

const validator = require("../middlewares/validator");
const userSchema = require("../schemas/user-schema");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/", userController.getAll);

router.post("/", validator(userSchema), userController.create);

router.post("/login", userController.login);

module.exports = router;
