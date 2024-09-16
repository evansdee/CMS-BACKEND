const { signup, login, getCurrentUser, authentication, changePassword, restrictTo } = require("../controller/authController");

const router = require("express").Router();

router.route("/signup").post(authentication,restrictTo("admin"),signup);
router.route("/login").post(login);
router.route("/user").get(authentication,getCurrentUser)
router.route("/changepassword").patch(authentication,changePassword)

module.exports = router;
