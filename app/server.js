require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const createError = require("http-errors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swaggerDef");

const app = express();
const port = 3004;

const specs = swaggerJsdoc(swaggerOptions);

app.use(logger("dev"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const summaryRouter = require("./routes/summary/index");
app.use("/summary", summaryRouter);

app.listen(port, () =>
  console.log(`ELMO Proxy API listening on port ${port}!`)
);

app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
