const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const bodyParser = require("body-parser");

const usersRouter = require("./routes/user.route");
const moviesRouter = require("./routes/movies.controller");
const reviewRouter = require("./routes/review.controller");
const mOfMonthRouter = require("./routes/moviesOfTheMonth.controller");
const screeningsRouter = require("./routes/screenings.controller");
const reservationRouter = require("./routes/reservation.controller");
const cinemaController = require("./routes/cinema.controller");
const auditoriumController = require("./routes/auditorium.controller");
const seatsController = require("./routes/seats.route");
const reserveSeatsController = require("./routes/reservedSeats.controller");
const paymentsController = require("./routes/stripe.route");
const adminController = require("./routes/admin.route");

const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminController);
app.use("/movies", moviesRouter);
app.use("/moviesOfTheMonth", mOfMonthRouter);
app.use("/users", usersRouter);
app.use("/users", reviewRouter);
app.use("/screening", screeningsRouter);
app.use("/reservations", reservationRouter);
app.use("/cinema", cinemaController);
app.use("/auditorium", auditoriumController);
app.use("/seat", seatsController);
app.use("/reservedSeat", reserveSeatsController);
app.use("/payments", paymentsController);

module.exports = app;
