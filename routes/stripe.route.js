require("dotenv").config();

const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../auth/authenticated");
const { createChechout } = require("./controllers/stripe/createCheckout");

router.post("/create-checkout", authenticateJWT, createChechout);

module.exports = router;
