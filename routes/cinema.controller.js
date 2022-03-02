const express = require("express");
const router = express.Router();
const db = require("../models");
const { Cinema } = db.sequelize.models;

router.get("/", async (req, res) => {
  const cinema = await Cinema.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(cinema);
});

router.post("/add", async (req, res) => {
  const { address } = req.body;

  const newCinema = await Cinema.create({ address});
  res.json(newCinema);
});


// router.put("/:id/update", async (req, res) => {
//     const cinema = await Cinema.update(
//       {address: req.body.address}, {
//       where: { id: req.params.id}
//       });
//       res.json(cinema)
// });

router.put("/:id/update", async (req, res) => {
  const cinema = await Cinema.upsert({
      id: req.params.id,
      address: req.body.address
  })
  res.json(cinema)
})

module.exports = router;

