const enrollment = require("../db/models/enrollment");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createEnrollment = catchAsync(async (req, res, next) => {
  const body = req.body;

  // const photoURL = `${req.protocol}://${req.get('host')}/uploads/photos/${req.file.filename}`;

  const newEnrollment = await enrollment.create({ ...body });

  return res.status(201).json({
    status: "success",
    data: newEnrollment,
  });
});

const getEnrollment = catchAsync(async (req, res, next) => {
  const result = await enrollment.findAll();
  if (!result) return next(new AppError("Invaid Id", 400));

  return res.json({
    status: "success",
    data: result,
  });
});

const getEnrollmentById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const enrollmentData = await enrollment.findByPk(id);

  if (!enrollmentData) return next(new AppError("Invaid Enrollment Id", 400));
  return res.json({
    status: "success",
    data: enrollmentData,
  });
});

const updateEnrollment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // const photoURL = req.file ? `${req.protocol}://${req.get('host')}/uploads/photos/${req.file.filename}` : null;
  const body = req.body;

  const result = await enrollment.findByPk(id);
  if (!result) return next(new AppError("Invaid Enrollment Id", 400));

  Object.keys(body).forEach((key) => {
    result[key] = body[key];
  });

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const deleteEnrollment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const result = await enrollment.findByPk(id);
  if (!result) return next(new AppError("Invaid Enrollment Id", 400));

  await result.destroy();

  return res.json({
    status: "success",
    message: "Deleted Successfully",
  });
});

module.exports = {
  createEnrollment,
  getEnrollment,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
};
