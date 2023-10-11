var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors")


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/usersRoutes");
var productsRouter = require("./routes/productsRoutes");


var app = express();

app.use(logger("dev"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


// global error

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// unhandled routes

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: `Cannot find ${req.originalUrl} on this server`,
  });
});

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
