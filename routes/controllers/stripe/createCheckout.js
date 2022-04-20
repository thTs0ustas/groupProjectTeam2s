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
    res.status(500).json({ message: error.message });
  }
};

const createSubscription = async (req, res) => {
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

      success_url: "http://localhost:3000/payments/subscription",
      cancel_url: "http://localhost:3000/payments/payment_cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const createSubscription = async (req, res) => {
//   const product = await stripe.products.create({ name: "Member" });

//   const plan = await stripe.plans.create({
//     currency: "eur",
//     interval: "year",
//     product: product.id,
//     nickname: "yearly subscription",
//     amount: 1500,
//     usage_type: "licensed",
//   });
//   const payload = await stripe.paymentMethods.create({
//     type: "card",
//     card: {
//       number: "4242424242424242",
//       exp_month: 12,
//       exp_year: 2026,
//       cvc: "123",
//     },
//   });

//   const customer = await stripe.customers.create({
//     payment_method: payload.id,
//     invoice_settings: {
//       default_payment_method: payload.id,
//     },
//   });

//   try {
//     await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [
//         {
//           plan: plan.id,
//           quantity: 1,
//         },
//       ],
//     });

//     res.json({ message: "success" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = { createCheckout, createSubscription };
