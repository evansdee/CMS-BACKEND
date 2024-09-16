const session = require("../db/models/session");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createSession = catchAsync(async (req, res, next) => {
  const body = req.body;
  const {
    startDate,
    endDate,
    active,
    newAmount,
    renewAmount,
    courseName,
    codeAlt,
    courseCode,
  } = body;

  const newSession = await session.create({
    startDate,
    endDate,
    active,
    newAmount,
    renewAmount,
    courseName,
    codeAlt,
    courseCode,
  });

  return res.status(201).json({
    status: "success",
    data: newSession,
  });
});

const getSession = catchAsync(async (req, res, next) => {
  const result = await session.findAll();

  return res.json({
    status: "success",
    data: result,
  });
});

const updateSession = catchAsync(async (req, res,next) => {
  const { id } = req.params;

  const {
    startDate,
    endDate,
    active,
    newAmount,
    renewAmount,
    courseName,
    codeAlt,
    courseCode,
  } = req.body;

  const result = await session.findByPk(id);
  if (!result) return next(new AppError("Invaid Enrollment Id", 400));

  result.active = active;
  result.startDate = startDate;
  result.endDate = endDate;
  result.codeAlt = codeAlt;
  result.courseCode = courseCode;
  result.courseName = courseName;
  result.newAmount = newAmount;
  result.renewAmount = renewAmount;

  const updatedResult = await result.save();
  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const deleteSession = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await session.findByPk(id);
  if (!result) return next(new AppError("Invaid Enrollment Id", 400));

  await result.destroy();

  return res.json({
    status: "success",
    message: "Deleted Successfully",
  });
});

module.exports = { createSession, getSession, updateSession, deleteSession };
