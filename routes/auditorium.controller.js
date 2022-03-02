const express = require("express");
const router = express.Router();
const db = require("../models");
const { Auditorium, Cinema} = db.sequelize.models;

router.get("/", async (req, res) => {
  const auditorium = await Auditorium.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: { model: Cinema, attributes: ["id", "address"] },
  });
  res.json(auditorium);
});


router.post("/add", async (req, res) => {
    const {cinema_id, hall_num, total_seats, free_seats} = req.body;
    const newAuditorium = await Auditorium.create({
        cinema_id, hall_num, total_seats, free_seats
    })
    res.json(newAuditorium);
})

module.exports = router;