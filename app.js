const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const moviesRouter = require("./routes/movies.controller");
const mOfMonthRouter = require("./routes/moviesOfTheMonth.controller");
const usersRouter = require("./routes/user.controller");
const reviewRouter = require("./routes/review.conteroller");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/movies", moviesRouter);
app.use("/moviesOfTheMonth", mOfMonthRouter);
app.use("/users", usersRouter);
app.use(reviewRouter);

module.exports = app;
