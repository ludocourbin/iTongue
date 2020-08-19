const express = require("express");

const adminMiddleware = require("../middlewares/admin-middleware");
const ownerMiddleware = require("../middlewares/owner-middleware");
const validator = require("../middlewares/validator");
const fileUploadMiddleware = require("../middlewares/file-upload-middleware");
const userSchema = require("../schemas/user-schema");
const userController = require("../controllers/user-controller");

const router = express.Router();

// TODO évaluer pour chaque route la pertinence du middleware validator

router.get("/", userController.showAll);

// TODO remettre l'adminMiddleware
router.post("/", validator(userSchema), userController.create);

router.post("/login", userController.login);

router.get("/:id(\\d+)", userController.showOne);

router.post("/:id(\\d+)", ownerMiddleware, validator(userSchema), userController.editProfile);

router.get("/:slug([a-z\\d]+(?:-[a-z\\d]+)*)", userController.showOne);

router.delete("/:id(\\d+)", adminMiddleware, userController.deleteOne);

router.post("/:id(\\d+)/language", ownerMiddleware, userController.addLanguage);

router.delete(
    "/:id(\\d+)/language/:languageId(\\d+)/:role",
    ownerMiddleware,
    userController.removeLanguage
);

router.post(
    "/:id(\\d+)/avatar",
    ownerMiddleware,
    fileUploadMiddleware("avatar"),
    userController.updateAvatar
);

module.exports = router;
