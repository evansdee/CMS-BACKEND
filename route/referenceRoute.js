const {
  createReference,
  getReference,
  updateReference,
  getRefByID
} = require("../controller/referenceController");

const router = require("express").Router();

router.route("/").post( createReference).get(getReference);
// router
//   .route("/count/:courseName")
//   .patch(authentication, updateByCourseCount)
  router
  .route("/:id")
  .get(getRefByID)
  .patch( updateReference)
//   .delete(authentication, deleteCoure);

module.exports = router;
