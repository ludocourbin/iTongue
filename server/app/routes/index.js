const express = require("express");

const authRouter = require("./auth-routes");
const userRouter = require("./user-routes");
const languageRouter = require("./language-routes");
const expressionRouter = require("./expression-routes");
const translationRouter = require("./translation-routes");
const adminRouter = require("./admin-routes");

const router = express.Router();

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
    console.log(err);
});

module.exports = router;
