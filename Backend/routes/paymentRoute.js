const express = require("express");
const router = express.Router();
const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Payment=require('./../models/Payment')
const User = require("../models/User");
const {protect}=require('./../middlewares/authentication')
router.post("/create-order",protect, async (req, res) => {
  try {
    const options = {
      amount: 100, // ₹1
      currency: "INR",
      receipt: `premium_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({

    user: req.user.id,

    razorpay_order_id: order.id,

    amount: order.amount,

    status: "created",
  });
    res.json(order);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.post("/verify", async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // CREATE SIGNATURE
    const sign =
      razorpay_order_id + "|" + razorpay_payment_id;

    // GENERATE EXPECTED SIGNATURE
    const expectedSign = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(sign.toString())
      .digest("hex");

    // VERIFY SIGNATURE
    if (razorpay_signature === expectedSign) {

      // UPDATE PAYMENT
      const payment = await Payment.findOneAndUpdate(
  {
    razorpay_order_id,
  },
  {
    razorpay_payment_id,
    razorpay_signature,
    status: "paid",
  },
  {
    returnDocument: "after",
  }
);

      // UPDATE USER PREMIUM
      
      const expiryDate = new Date();

expiryDate.setMonth(expiryDate.getMonth() + 1);

await User.findByIdAndUpdate(payment.user, {

  isPremium: true,

  premiumExpiresAt: expiryDate,
});
      

      return res.json({
        success: true,
        message: "Payment Verified",
      });

    } else {

      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

  } catch (error) {
console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;