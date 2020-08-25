const express = require("express");

const recordController = require("../controllers/record-controller");

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

module.exports = router;
