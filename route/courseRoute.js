const {
  createCourse,
  getCourse,
  updateByCourseApproval,
  updateByCourseCount,
  getCourseByID,
  deleteCoure,
} = require("../controller/courseController");
const { authentication } = require("../controller/authController");

const router = require("express").Router();

router.route("/").post(authentication, createCourse).get(authentication,getCourse);
router
  .route("/count/:courseName")
  .patch(authentication, updateByCourseCount)
  router
  .route("/:id")
  .get(getCourseByID)
  .patch(authentication, updateByCourseApproval)
  .delete(authentication, deleteCoure);

module.exports = router;
