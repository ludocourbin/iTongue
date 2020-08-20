const express = require("express");

const authRouter = require("./auth-routes");
const userRouter = require("./user-routes");
const languageRouter = require("./language-routes");
const expressionRouter = require("./expression-routes");
const translationRouter = require("./translation-routes");
const adminRouter = require("./admin-routes");
const searchRouter = require("./search-routes");

const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *      summary: Check router status
 *      description: Check router status
 *      responses:
 *          '200':
 *              description: successful response
 *              content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                      example:
 *                        message: Router is working
 */
router.get("/", (_, res) => {
    res.json({ data: { message: "Router is working" } });
});

// Route de test pour auth-middleware
router.get("/private", require("../middlewares/auth-middleware"), (_, res) => {
    res.json({ data: { msg: "Authorized" } });
});

// Route de test pour admin-middleware
router.get("/admin", require("../middlewares/admin-middleware"), (_, res) => {
    res.json({ data: { msg: "Authorized" } });
});

router.use("/search", searchRouter);

router.use("/admin", adminRouter);

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/languages", languageRouter);

router.use("/expressions", expressionRouter);

router.use("/translations", translationRouter);

router.use((_, res) => {
    res.status(404).json({ errors: [{ msg: "Resource not found" }] });
});

router.use((err, req, res, next) => {
    res.json({ errors: [{ msg: err.toString() }] });
    console.log(err);
});

module.exports = router;
