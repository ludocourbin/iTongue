require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require(path.resolve("doc/swaggerOptions"));

const router = require("./app/routes");

const app = express();

app.use(cors());

app.use(express.static(path.resolve("app/public")));

app.use(express.urlencoded({ extended: true }), express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      deepLinking: true,
      filter: true,
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: 3
    }
  })
);

app.use(router);

module.exports = app;
