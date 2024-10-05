const verifyPayment = require("../controller/paystackController");

const router = require("express").Router();

router.route("/verifyPayment").post(verifyPayment);
module.exports = router;
