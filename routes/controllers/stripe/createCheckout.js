require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const createCheckout = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.data.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
      })),

      success_url: "http://localhost:3000/payments",
      cancel_url: "http://localhost:3000/payments/payment_cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCheckout };
