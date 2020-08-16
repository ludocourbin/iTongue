const express = require("express");

const userRouter = require("./user-routes");

const router = express.Router();

router.get("/", (_, res) => {
  res.json({ data: { message: "Router is working" } });
});

router.use("/users", userRouter);

router.use((err, req, res, next) => {
  console.log(err);
});

module.exports = router;
