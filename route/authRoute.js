const { signup, login, getCurrentUser, authentication, changePassword, restrictTo, logout } = require("../controller/authController");
const { verifyOTP, requestNewOTP } = require("../controller/otpController");

const router = require("express").Router();

// router.route("/signup").post(signup);
router.route("/signup").post(signup);
router.route("/verifyOTP").post(verifyOTP);
router.route("/requestNewOtp").post(requestNewOTP);
// router.route("/signup").post(authentication,restrictTo("admin"),signup);
router.route("/login").post(login)
router.route("/logout").post(authentication,logout)
router.route("/user").get(authentication,getCurrentUser)
router.route("/passwordReset").patch(authentication,changePassword)

module.exports = router;
