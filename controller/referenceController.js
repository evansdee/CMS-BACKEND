const reference = require("../db/models/reference");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createReference = catchAsync(async (req, res, next) => {
  try {
    const {
      firstName,
      middleName,
      address,
      amount,
      refStatus,
      gsm,
      dob,
      means,
      meansId,
      courseName,
      country,
      state,
      stateReside,
      email,
      gender,
      lastName,
      lga,
      marital,
    } = req.body;

    const newStudent = await reference.create({
      firstName,
      middleName,
      address,
      amount,
      refStatus,
      gsm,
      dob,
      means,
      meansId,
      courseName,
      country,
      state,
      stateReside,
      email,
      gender,
      lastName,
      lga,
      marital,
    });

    res.status(201).json({
      status: "success",
      data: newStudent,
    });
  } catch (error) {
    next(error);
  }
});

const getReference = catchAsync(async (req, res, next) => {
  const result = await reference.findAll();

  return res.json({
    status: "success",
    data: result,
  });
});

const getRefByID = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await course.findOne({ where: { id } });
  if (!result) return next(new AppError("Invaid Reference Id", 400));

  return res.json({
    status: "success",
    data: result,
  });
});

const updateReference = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { refStatus } = req.body;
  const result = await reference.findOne({ where: { id } });
  if (!result) return next(new AppError("Invaid Referenc No.", 400));

  result.refStatus = refStatus;

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
  createReference,
  getReference,
  updateReference,
  getRefByID,
  deleteCoure,
};
