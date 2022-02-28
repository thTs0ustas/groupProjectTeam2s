const express = require("express");
const router = express.Router();
const db = require("../models");
const { Screening, MovieOfTheMonth, Auditorium, Movie } = db.sequelize.models;

module.exports = router;
