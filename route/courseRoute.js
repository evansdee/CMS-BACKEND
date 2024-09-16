const {createCourse, getCourse,updateCourse, getCourseByID} = require("../controller/courseController");
const { authentication } = require("../controller/authController");


const router = require("express").Router();

router.route("/").post(authentication,createCourse).get(getCourse);
router.route("/:courseName").get(getCourseByID).patch(authentication,updateCourse)
// router.route("/:id")

module.exports = router;
