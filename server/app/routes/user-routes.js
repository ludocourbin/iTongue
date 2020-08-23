const express = require("express");

const adminMiddleware = require("../middlewares/admin-middleware");
const ownerMiddleware = require("../middlewares/owner-middleware");
const validator = require("../middlewares/validator");
const fileUploadMiddleware = require("../middlewares/file-upload-middleware");
const userSchema = require("../schemas/user-schema");
const loginFormSchema = require("../schemas/login-form-schema");
const recordSchema = require("../schemas/record-schema");
const userController = require("../controllers/user-controller");

const router = express.Router();

// TODO évaluer pour chaque route la pertinence du middleware validator

/**
 * @swagger
 * /users:
 *  get:
 *      tags:
 *        - Users
 *      summary: Returns a list of users
 *      description: List of **users** with detail about their activity on the app
 *      responses:
 *          "200":
 *              description: A JSON array of user objects with their records and languages nested in it
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      data:
 *                        type: array
 *                        items:
 *                          $ref: "#/components/schemas/User"
 */
router.get("/", userController.showAll);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Registration form submission. Returns the primary key of the newly created user if no error occurs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/NewUser"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/NewUser"
 *     responses:
 *       "201":
 *         description: Success. Id of the newly created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       $ref: "#/components/schemas/PrimaryKey"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "409":
 *         $ref: "#/components/responses/Conflict"
 *
 */
router.post("/", validator(userSchema), userController.create);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: User authentication
 *     description: Login form submission. Returns the logged user if the authentication process succeeds.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginForm"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/LoginForm"
 *     responses:
 *       "200":
 *         description: Success. The access token, the refresh token and the logged user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToke:
 *                     refreshToken:
 *                     user:
 *                      $ref: "#/components/schemas/User"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 */
router.post("/login", validator(loginFormSchema), userController.login);

router.get("/:id(\\d+)", userController.showOne);

router.post("/:id(\\d+)", ownerMiddleware, validator(userSchema), userController.editProfile);

router.get("/:slug([a-z\\d]+(?:-[a-z\\d]+)*)", userController.showOne);

router.delete("/:id(\\d+)", adminMiddleware, userController.deleteOne);

router.post("/:id(\\d+)/slug", ownerMiddleware, validator(userSchema), userController.updateSlug);

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

router.post(
  "/:id(\\d+)/record",
  ownerMiddleware,
  fileUploadMiddleware("record"),
  validator(recordSchema),
  userController.addRecord
);

router.delete("/:id/record/:recordId", ownerMiddleware, userController.removeRecord);

module.exports = router;
