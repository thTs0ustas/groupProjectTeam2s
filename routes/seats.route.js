const express = require("express");
const router = express.Router();

const { addSeat } = require("./controllers/seats/addSeat");
const { getSeat } = require("./controllers/seats/getSeat");

router.get("/:auditorium_id", getSeat);
router.post("/add/:aud_id", addSeat);

module.exports = router;
