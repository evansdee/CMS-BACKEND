const {createSession, getSession, updateSession, deleteSession} = require("../controller/sessionController");
const { authentication } = require("../controller/authController");

const router = require("express").Router();

router.route("/").post(authentication,createSession).get(authentication,getSession);
router.route("/:id").patch(authentication,updateSession).delete(authentication,deleteSession);

module.exports = router;
