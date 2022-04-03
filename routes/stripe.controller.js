require("dotenv").config();

const express = require("express");
const { authenticateJWT } = require("../auth/authenticated");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/create-checkout", authenticateJWT, async (req, res) => {
  console.log(req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: req.body.name,
            },
            unit_amount: +req.body.price,
          },
          quantity: +req.body.quantity,
        },
      ],
      success_url: "http://localhost:3000/payments",
      cancel_url: "http://localhost:3000/payments/payment_cancel",
    });
    console.log(session.url);
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
