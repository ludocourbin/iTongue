const express = require("express");

const languageController = require("../controllers/language-controller");

const router = express.Router();

/**
 * @swagger
 * /languages:
 *  get:
 *      tags: 
 *        - Languages
 *      summary: Get all languages
 *      description: This route serves all languages - Array of objects
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        name:
 *                           type: string
 *                        code:
 *                           type: string
 *                    example:
 *                       datas: [ 
 *                          { 
 *                            id: 1,
 *                            name: french,
 *                            code: fr
 *                          },
 *                          { 
 *                            id: 2,
 *                            name: spanish,
 *                            code: es_ES
 *                          },
 *                       ]
 */
router.get("/", languageController.getAll);

module.exports = router;
