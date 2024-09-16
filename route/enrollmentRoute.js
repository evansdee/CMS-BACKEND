const { authentication } = require("../controller/authController");
const {
  createEnrollment,
  getEnrollment,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} = require("../controller/enrollmentController");
const { uploadPhoto } = require("../controller/uploaderController");

const router = require("express").Router();

router.route("/").post(uploadPhoto, createEnrollment).get(getEnrollment);
router.route("/:id").get(getEnrollmentById).patch(uploadPhoto,updateEnrollment).delete(deleteEnrollment);

module.exports = router;
 