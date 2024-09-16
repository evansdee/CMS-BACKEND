const { authentication } = require("../controller/authController");
const {
  createEnrollment,
  getEnrollment,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} = require("../controller/enrollmentController");

const router = require("express").Router();

router.route("/").post( createEnrollment).get(getEnrollment);
router.route("/:id").get(getEnrollmentById).patch(updateEnrollment).delete(deleteEnrollment);

module.exports = router;
 