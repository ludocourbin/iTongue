require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const router = require("./app/routes");

const app = express();

app.use(express.static(path.resolve("app/public")));

app.use(cors());

app.use(express.urlencoded({ extended: true }), express.json());

app.use(router);

module.exports = app;
