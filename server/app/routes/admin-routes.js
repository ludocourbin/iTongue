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
 * @swagger
 * /admin/languages:
 *  post:
 *      tags: 
 *        - Languages
 *      summary: Add one language
 *      description: This routes in made for creating new languages
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                code:
 *                 type: string
 *                 pattern: '(^\w{2}$)|(^\w{2}_\w{2}$)'
 *              required:
 *                - name
 *                - code
 *            examples:
 *              french:
 *                value:
 *                  name: french
 *                  code: fr
 *              spanish:
 *                value:
 *                  name: spanish
 *                  code: es_ES
 *      responses:
 *          '200':
 *              description: Created language object
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        readOnly: true
 *                      name:
 *                        type: string
 *                      code:
 *                        type: string
 *                    example:
 *                       id: 1
 *                       name: french
 *                       code: fr_FR
 *          '401':
 *              description: Unauthorized
 */
router.post("/languages", validator(languageSchema), languageController.create);

/**
 * @swagger
 * /admin/expressions:
 *  post:
 *      tags: 
 *        - Expressions
 *      summary: Add one expression
 *      description: This routes in made for creating new expressions
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                label:
 *                  type: string
 *              required:
 *                - label
 *            examples:
 *              bjr:
 *                value:
 *                  label: bjr
 *      responses:
 *          '201':
 *              description: Created expression object
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        readOnly: true
 *                      label:
 *                        type: string
 *                      createdAt:
 *                        type: string
 *                    example:
 *                       id: 1
 *                       label: bjr
 *                       createdAt: 2020-08-19T11:44:20.590Z
 *          '401':
 *              description: Unauthorized
 */
router.post("/expressions", validator(expressionSchema), expressionController.create);

/**
 * @swagger
 * /admin/expressions/{id}:
 *  post:
 *      tags: 
 *        - Expressions
 *      summary: Update one expression
 *      description: This routes in made for updating one expression
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximim: 1
 *          description: id of the expression
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                label:
 *                  type: string
 *              required:
 *                - label
 *            examples:
 *              bjr:
 *                value:
 *                  label: bjr
 *      responses:
 *          '204':
 *              description: Expression updated successfully
 *          '401':
 *              description: Unauthorized
 *          '409':
 *              description: Conflict
 */
router.post("/expressions/:id([0-9]+)", validator(expressionSchema), expressionController.update);

/**
 * @swagger
 * /admin/expressions/{id}:
 *  delete:
 *      tags: 
 *        - Expressions
 *      summary: Delete one expression
 *      description: This routes in made for deleting one expression
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximim: 1
 *          description: id of the expression
 *      responses:
 *          '204':
 *              description: Expression deleted successfully
 *          '401':
 *              description: Unauthorized
 */
router.delete("/expressions/:id([0-9]+)", expressionController.deleteOne);

/**
 * @swagger
 * /admin/translations:
 *  post:
 *      tags: 
 *        - Translations
 *      summary: Add one translation
 *      description: This routes in made for creating new translations
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                text:
 *                  type: string
 *                expression_id:
 *                  type: integer
 *                language_id:
 *                  type: integer
 *              required:
 *                - text
 *                - expression_id
 *                - language_id
 *            examples:
 *              bonjour:
 *                value:
 *                  text: Bonjour
 *                  expression_id: 2
 *                  language_id: 1
 *              hello:
 *                value:
 *                  text: Hello
 *                  expression_id: 2
 *                  language_id: 2
 *      responses:
 *          '201':
 *              description: Created translation object
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        readOnly: true
 *                      text:
 *                        type: string
 *                      expression_id:
 *                        type: integer
 *                      language_id:
 *                        type: integer
 *                    example:
 *                      id: 8
 *                      text: Hello
 *                      expression_id: 2
 *                      language_id: 2
 *          '401':
 *              description: Unauthorized
 *          '409':
 *              description: Conflict
 */
router.post("/translations", validator(translationSchema), translationController.create);

/**
 * @swagger
 * /admin/translations/{id}:
 *  post:
 *      tags: 
 *        - Translations
 *      summary: Update one translation
 *      description: This routes in made for updating one translation
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximim: 1
 *          description: id of the translation
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                text:
 *                  type: string
 *                expression_id:
 *                  type: integer
 *                language_id:
 *                  type: integer
 *              required:
 *                - text
 *                - expression_id
 *                - language_id
 *            examples:
 *              bonjour:
 *                value:
 *                  text: Bonjour
 *                  expression_id: 2
 *                  language_id: 1
 *              hello:
 *                value:
 *                  text: Hello
 *                  expression_id: 2
 *                  language_id: 2
 *      responses:
 *          '204':
 *              description: Translation updated successfully
 *          '401':
 *              description: Unauthorized
 *          '409':
 *              description: Conflict
 */
router.post("/translations/:id(\\d+)", validator(translationSchema), translationController.update);

/**
 * Deletes an existing translation
 * @route /admin/translations/:id
 * @method DELETE
 * @returns {Boolean} - True if success
 */
/**
 * @swagger
 * /admin/translations/{id}:
 *  delete:
 *      tags: 
 *        - Translations
 *      summary: Delete one translation
 *      description: This routes in made for deleting one translation
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximim: 1
 *          description: id of the translation
 *      responses:
 *          '204':
 *              description: Translation deleted successfully
 *          '401':
 *              description: Unauthorized
 */
router.delete("/translations/:id([0-9]+)", translationController.deleteOne);

module.exports = router;
