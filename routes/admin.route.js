const express = require("express");

const { authenticateJWT, isAdminCheck } = require("../auth/authenticated");
const { fetchUsers } = require("./controllers/user/fetchUsers");

const getScreenings = require("./controllers/admin/getScreenings");
const updateUser = require("./controllers/admin/updateUser");
const updateScreening = require("./controllers/admin/updateScreening");
const createScreening = require("./controllers/admin/createScreening");
const { getMovies, getMoviesNotPlaying } = require("./controllers/admin/getMovies");
const getMoviesOfTheMonth = require("./controllers/admin/getMoviesOfTheMonth");
const createMovie = require("./controllers/admin/createMovie");
const updateMovie = require("./controllers/admin/updateMovie");
const createMovieOfTheMonth = require("./controllers/admin/creathMovieOfTheMonth");

const router = express.Router();
// Get data from the database
router.get("/:username/getUsers", authenticateJWT, isAdminCheck, fetchUsers);
router.get("/:username/getScreenings", authenticateJWT, isAdminCheck, getScreenings);
router.get("/:username/getMovies", authenticateJWT, isAdminCheck, getMovies);
router.get("/:username/getMoviesNotPlaying", authenticateJWT, isAdminCheck, getMoviesNotPlaying);
router.get("/:username/getMoviesOfTheMonth", authenticateJWT, isAdminCheck, getMoviesOfTheMonth);
// Update data in the database
router.put("/update/movie/:id", authenticateJWT, isAdminCheck, updateMovie);
router.put("/update/user/:id", authenticateJWT, isAdminCheck, updateUser);
router.put("/update/screening/:id", authenticateJWT, isAdminCheck, updateScreening);
// Create data in the database
router.post("/:username/screening/create", authenticateJWT, isAdminCheck, createScreening);
router.post("/:username/movie/create", authenticateJWT, isAdminCheck, createMovie);
router.post(
  "/:username/movieOfTheMonth/create",
  authenticateJWT,
  isAdminCheck,
  createMovieOfTheMonth
);
//  Delete data in the database
module.exports = router;
