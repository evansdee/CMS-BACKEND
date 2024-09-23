const course = require("../db/models/course");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createCourse = catchAsync(async (req, res, next) => {
  const body = req.body;
  const {
    size,
    certImg,
    count,
    newAmount,
    renewAmount,
    courseName,
    codeAlt,
    courseCode,
    isApproved,
  } = body;

  const newCourse = await course.create({
    size,
    certImg,
    count,
    newAmount,
    renewAmount,
    courseName,
    codeAlt,
    courseCode,
    isApproved,
  });

  return res.status(201).json({
    status: "success",
    data: newCourse,
  });
});

const getCourse = catchAsync(async (req, res, next) => {
  const result = await course.findAll();

  return res.json({
    status: "success",
    data: result,
  });
});

const getCourseByID = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await course.findOne({ where: { id } });
  if (!result) return next(new AppError("Invaid Enrollment Id", 400));

  return res.json({
    status: "success",
    data: result,
  });
});

const updateByCourseApproval = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { isApproved, count, certImg } = req.body;
  const result = await course.findOne({ where: { id } });
  if (!result) return next(new AppError("Invaid Course Name", 400));

  // result.count = count
  result.isApproved = isApproved;
  // result.certImg = certImg

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const updateByCourseCount = catchAsync(async (req, res, next) => {
  const { courseName } = req.params;
  const { isApproved, count, certImg } = req.body;
  const result = await course.findOne({ where: { courseName } });
  if (!result) return next(new AppError("Invaid Course Name", 400));

  result.count = count;
  result.isApproved = isApproved;
  result.certImg = certImg;

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const deleteCoure = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await course.findByPk(id);

  if (!result) return next(new AppError("Invaid Course Id", 400));

  await result.destroy();

  return res.json({
    status: "success",
    message: "Deleted Successfully",
  });
});

module.exports = {
  createCourse,
  getCourse,
  updateByCourseApproval,
  updateByCourseCount,
  getCourseByID,
  deleteCoure,
};
