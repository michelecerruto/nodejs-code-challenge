const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const { notFound, errorHandler } = require("./middlewares/middleware");

const app = express();

app.use(helmet());
app.use(morgan("combined"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

const routes = require("./routes/film");

app.use("/v1", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;