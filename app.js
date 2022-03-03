const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user.controller");
const moviesRouter = require("./routes/movies.controller");
const reviewRouter = require("./routes/review.controller");
const mOfMonthRouter = require("./routes/moviesOfTheMonth.controller");
const screeningsRouter = require("./routes/screenings.controller");
const reservationRouter = require("./routes/reservation.controller");
const cinemaController = require("./routes/cinema.controller");
const auditoriumController = require("./routes/auditorium.controller");
const seatsController = require("./routes/seats.controller");
const reserveSeatsController = require("./routes/reservedSeats.controller");
const session = require("express-session");
const passport = require("passport");

// const whitelist = ['http://localhost:3000','http://localhost:4000/*']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: true,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/movies", moviesRouter);
app.use("/moviesOfTheMonth", mOfMonthRouter);
app.use("/users", usersRouter);
app.use("/users", reviewRouter);
app.use("/screenings", screeningsRouter);
app.use("/reservations", reservationRouter);
app.use("/cinema", cinemaController);
app.use("/auditorium", auditoriumController);
app.use("/seats", seatsController);
app.use("/reservedSeats", reserveSeatsController);

module.exports = app;
