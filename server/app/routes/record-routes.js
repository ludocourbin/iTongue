const express = require("express");

const recordController = require("../controllers/record-controller");

const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

/**
 * @swagger
 * /records:
 *   get:
 *     tags:
 *       - Records
 *     summary: Show a list of records
 *     description: List of audio files recordes by the iTongue community.
 *     responses:
 *       "200":
 *         description: A JSON array of record objects with their users and translations nested in it
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Record"
 */
router.get("/", recordController.showAll);

router
  .route("/:id/like")
  .post(authMiddleware, recordController.like)
  .delete(authMiddleware, recordController.unlike);

router.get("/:id/likes", recordController.showLikes);

router
  .route("/:id/bookmark")
  .post(authMiddleware, recordController.bookmark)
  .delete(authMiddleware, recordController.unbookmark);

router.get("/:id/bookmarks", recordController.showBookmarks);

module.exports = router;
