require("dotenv").config();

const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../auth/authenticated");
const { createCheckout } = require("./controllers/stripe/createCheckout");

router.post("/create-checkout", authenticateJWT, createCheckout);

module.exports = router;
