const express = require("express");

const validator = require("../middlewares/validator");
const languageSchema = require("../schemas/language-schema");
const expressionSchema = require("../schemas/expression-schema");
const translationSchema = require("../schemas/translation-schema");
const languageController = require("../controllers/language-controller");
const expressionController = require("../controllers/expression-controller");
const translationController = require("../controllers/translation-controller");

const router = express.Router();

/**
 * Creates a new language
 * @route /admin/language
 * @method POST
 * @property {String} name - Name of the language, only letters accepted
 * @property {String} code - Code of the language, pattern [fr] or [fr_FR]
 * @returns {Boolean} - True if success
 * @returns {Error} - If sent data aren't valid
 */
router.post("/languages", validator(languageSchema), languageController.create);
router.delete("/languages/:id", languageController.todo);

/**
 * Creates a new expression
 * @route /admin/expression
 * @method POST
 * @property {String} label - Text of the label
 * @property {String} text - Text of the translation
 * @property {Integer} language_id - Int
 * @returns {Boolean} - True if success
 * @returns {Error} - If sent data aren't valid
 */
router.post("/expression", validator(expressionSchema), expressionController.create);
router.delete("/expression/:id([0-9]+)", expressionController.deleteOneById);

/**
 * Creates a new translation
 * @route /admin/translation
 * @method POST
 * @property {String} text - Text of the translation
 * @property {Integer} expression_id - Text of the label
 * @property {Integer} language_id - Int
 * @returns {Boolean} - True if success
 * @returns {Error} - If sent data aren't valid
 */
router.post("/translation", validator(translationSchema), translationController.create);
router.post("/translation/:id(\\d+)", validator(translationSchema), translationController.update);
router.delete("/translation/:id([0-9]+)", expressionController.deleteOneById);

module.exports = router;
