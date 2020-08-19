const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const validator = require("../middlewares/validator");
const userSchema = require("../schemas/user-schema");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/", userController.showAll);

// TODO remettre l'adminMiddleware
router.post("/", validator(userSchema), userController.create);

router.post("/login", userController.login);

router.get("/:id(\\d+)", userController.showOne);

router.delete("/:id(\\d+)", adminMiddleware, userController.deleteOne);

router.post("/:id(\\d+)/language", authMiddleware, userController.addLanguage);

module.exports = router;
