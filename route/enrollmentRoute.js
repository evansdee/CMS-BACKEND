const { authentication } = require("../controller/authController");
const {
  createEnrollment,
  getEnrollment,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} = require("../controller/enrollmentController");

const router = require("express").Router();

router
  .route("/")
  .post(authentication, createEnrollment)
  .get(authentication, getEnrollment);
router
  .route("/:id")
  .get(authentication, getEnrollmentById)
  .patch(authentication, updateEnrollment)
  .delete(authentication, deleteEnrollment);

module.exports = router;
