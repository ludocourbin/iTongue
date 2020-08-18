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
 * @route /admin/languages
 * @method POST
 * @property {String} name - Name of the language, only letters accepted
 * @property {String} code - Code of the language, pattern [fr] or [fr_FR]
 * @returns {Boolean} - True if success
 * @returns {Error} - If sent data aren't valid
 */
router.post("/languages", validator(languageSchema), languageController.create);

/**
 * Creates a new expression
 * @route /admin/expressions
 * @method POST
 * @property {String} label - Text of the label
 * @returns {Object} - Created expression
 * @returns {Error} - If sent data aren't valid
 */
router.post("/expressions", validator(expressionSchema), expressionController.create);

/**
 * Updates an existing expression
 * @route /admin/expressions/:id
 * @method POST
 * @property {String} label - Text of the label
 * @returns {Object} - Updated datas
 * @returns {Error} - If sent data aren't valid
 */
router.post("/expressions/:id([0-9]+)", validator(expressionSchema), expressionController.update);

/**
 * Deletes an existing expression
 * @route /admin/expressions/:id
 * @method DELETE
 * @returns {Boolean} - True if success
 */
router.delete("/expressions/:id([0-9]+)", expressionController.deleteOne);

/**
 * Creates a new translation
 * @route /admin/translations
 * @method POST
 * @property {String} text - Text of the translation
 * @property {Integer} expression_id - Text of the label
 * @property {Integer} language_id - Int
 * @returns {Boolean} - True if success
 * @returns {Error} - If sent data aren't valid
 */
router.post("/translations", validator(translationSchema), translationController.create);

/**
 * Updates an existing translation
 * @route /admin/translations/:id
 * @method POST
 * @property {String} text - Text of the label
 * @property {Number} expression_id - Id of the expression
 * @property {Number} language_id - Id of the language
 * @returns {Object} - Updated datas
 * @returns {Error} - If sent data aren't valid
 */
router.post("/translations/:id(\\d+)", validator(translationSchema), translationController.update);

/**
 * Deletes an existing translation
 * @route /admin/translations/:id
 * @method DELETE
 * @returns {Boolean} - True if success
 */
router.delete("/translations/:id([0-9]+)", translationController.deleteOne);

module.exports = router;
