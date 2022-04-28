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
const deleteScreening = require("./controllers/admin/deleteScreening");
const deleteMovieOfTheMonth = require("./controllers/admin/deleteMovieOfTheMonth");
const deleteUser = require("./controllers/admin/deleteUser");
const { deleteMovie } = require("./controllers/admin/deleteMovies");

const router = express.Router();
// Get data from the database
router.get("/:id/getUsers", authenticateJWT, isAdminCheck, fetchUsers);
router.get("/:id/getScreenings", authenticateJWT, isAdminCheck, getScreenings);
router.get("/:id/getMovies", authenticateJWT, isAdminCheck, getMovies);
router.get("/:id/getMoviesNotPlaying", authenticateJWT, isAdminCheck, getMoviesNotPlaying);
router.get("/:id/getMoviesOfTheMonth", authenticateJWT, isAdminCheck, getMoviesOfTheMonth);
// Update data in the database
router.put("/:id/update/movie/:movieId", authenticateJWT, isAdminCheck, updateMovie);
router.put("/:id/update/user", authenticateJWT, isAdminCheck, updateUser);
router.put("/:id/update/screening/:screeningId", authenticateJWT, isAdminCheck, updateScreening);
// Create data in the database
router.post("/:id/screening/create", authenticateJWT, isAdminCheck, createScreening);
router.post("/:id/movie/create", authenticateJWT, isAdminCheck, createMovie);
router.post("/:id/movieOfTheMonth/create", authenticateJWT, isAdminCheck, createMovieOfTheMonth);

//  Delete data in the database
router.delete("/:id/screening/delete/:screeningId", authenticateJWT, isAdminCheck, deleteScreening);
router.delete("/:id/delete/movie/:movieId", authenticateJWT, isAdminCheck, deleteMovie);
router.delete("/:id/movieOfTheMonth/delete/:movieId", authenticateJWT, isAdminCheck, deleteMovieOfTheMonth);
router.delete("/:id/user/delete", authenticateJWT, isAdminCheck, deleteUser);

module.exports = router;
