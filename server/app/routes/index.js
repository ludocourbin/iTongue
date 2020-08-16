const express = require("express");

const authRouter = require("./auth-routes");
const userRouter = require("./user-routes");

const router = express.Router();

router.get("/", (_, res) => {
  res.json({ data: { message: "Router is working" } });
});

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use((err, req, res, next) => {
  console.log(err);
});

module.exports = router;
