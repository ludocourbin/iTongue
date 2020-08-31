const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const commentController = require("../controllers/comment-controller");

const router = express.Router();

/**
 * @swagger
 * /comments/{recordId}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get comments from a record
 *     description: Retrieves all comments from a single record
 *     responses:
 *       "200":
 *         description: Success. An object containing the detail of the user activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comments"
 */
router.get("/:recordId(\\d+)", commentController.showAllByRecordId);

/**
 * @swagger
 * /comments/{userId}/{recordId}:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add comment
 *     description: Allows user to post a comment on a record
 *     responses:
 *       "204":
 *         description: Ok
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 */
router.post("/:recordId(\\d+)", authMiddleware, commentController.create);

/**
 * @swagger
 * /comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Update user's comment
 *     description: Allows user to update an existant comment on a record
 *     responses:
 *       "204":
 *         description: Ok
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 */
router.post("/update/:commentId(\\d+)/", authMiddleware, commentController.update);

/**
 * @swagger
 * /comments:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Add comment
 *     description: Allows user to post a comment on a record
 *     responses:
 *       "204":
 *         description: Ok
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 */
router.delete("/:commentId(\\d+)", authMiddleware, commentController.delete);

module.exports = router;
