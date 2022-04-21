require("dotenv").config();

const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../auth/authenticated");
const { createCheckout, createSubscription } = require("./controllers/stripe/createCheckout");

router.post("/create-checkout", authenticateJWT, createCheckout);
router.get("/create-subscription", createSubscription);

module.exports = router;
