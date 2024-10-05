const catchAsync = require("../utils/catchAsync");
const axios = require('axios');

const verifyPayment = catchAsync(async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ message: "Payment reference is required" });
  }

  try {
    // Make a request to Paystack's verification endpoint
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { data } = response;

    // Check if the payment was successful
    if (data.status && data.data.status === "success") {
      // Send relevant transaction details back to the frontend
      return res.status(200).json({
        message: "Payment verified successfully",
        transactionId: data.data.id,
        amount: data.data.amount / 100, // Amount is returned in kobo, convert to naira
        date: data.data.paid_at,
        email: data.data.customer.email,
      });
    }

    // Handle unsuccessful payment
    return res.status(400).json({ message: `Payment not successful lol ${data}` });
  } catch (error) {
    console.error("Error verifying payment:", error);
    // Handle any errors that occur during the verification process
    return res.status(500).json({ message: "Error verifying payment" });
  }
});



module.exports = verifyPayment