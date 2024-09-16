const course = require("../db/models/course");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createCourse = catchAsync(async (req, res, next) => {
  const body = req.body;
  const {
    size,
    certiImg,
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
    certiImg,
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

  const {courseName} = req.params
  const result = await course.findOne({ where: { courseName } });
  if (!result) return next(new AppError("Invaid Enrollment Id", 400));

  return res.json({
    status: "success",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res, next) => {
  const {courseName} = req.params
  const {isApproved,count} = req.body
  const result = await course.findOne({where:{courseName}});
  if (!result) return next(new AppError("Invaid Course Name", 400));

  console.log(courseName)

  result.count = count
  result.isApproved = isApproved

  const updatedResult = await result.save()

  return res.json({
    status: "success",
    data: updatedResult,
  });
});



module.exports = {createCourse,getCourse,updateCourse,getCourseByID};
