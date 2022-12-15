// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51KEEOdSAExMSn5G6E55enSUQ3Zp3yPwjkScJnL52mwDCQaMTD6LgmgIruwEYq6tEzImxV7nYrH4KUQdRfL2F2ref00FbIFcyLg"
);
const planModel = require("../Models/planModel");
const userModel = require("../Models/userModel");

const YOUR_DOMAIN = "http://localhost:3000";

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let planId = req.params.id;

    const user = userModel.findById(userId);
    const plan = planModel.findById(planId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      client_reference: plan.id,
      line_item: [
        {
          name: plan.name,
          description: plan.description,
          // deploy website
          amount: plan.price * 100,
          currency: "inr",
          quantity: 1,
        },
      ],
      // dev => http
      // production => https
      success_url: `${req.protocol}://${req.get("host")}/profile`,
      cancel_url: `${req.protocol}://${req.get("host")}/profile`,
    });
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
