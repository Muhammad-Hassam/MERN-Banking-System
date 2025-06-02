const express = require("express");
const NotFoundError = require("./middleware/404Handling");
const ApiError = require("./utils/apiError");
const app = express();

app.use(express.json());

app.use("/api/v1", require("./router"));

app.use("", (req, res, next) => {
  next(new ApiError(404, "Not Found"));
});

app.use(NotFoundError);

app.get("/", (req, res) => {
  res.send({ msg: "Hello World!" });
});

module.exports = app;
