const enrollment = require("../db/models/enrollment");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createEnrollment = catchAsync(async (req, res, next) => {
  const body = req.body;
  const {
    firstName,
    middleName,
    address,
    bank,
    amount,
    status,
    fullName,
    certificateNo,
    isSignature,
    startDate,
    endDate,
    enrollDate,
    gsm,
    dob,
    printStatus,
    isRenewal,
    means,
    meansId,
    courseName,
    codeAlt,
    courseCode,
    country,
    state,
    stateReside,
    email,
    gender,
    lastName,
    lga,
    marital,
    photo,
  } = body;

  // const photoURL = `${req.protocol}://${req.get('host')}/uploads/photos/${req.file.filename}`;

  const newEnrollment = await enrollment.create({
    firstName,
    middleName,
    address,
    bank,
    amount,
    status,
    fullName,
    certificateNo,
    isSignature,
    startDate,
    endDate,
    enrollDate,
    gsm,
    dob,
    printStatus,
    isRenewal,
    means,
    meansId,
    courseName,
    codeAlt,
    courseCode,
    country,
    state,
    stateReside,
    email,
    gender,
    lastName,
    lga,
    marital,
    photo
  });

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

  const body = req.body;

  const result = await enrollment.findByPk(id);
  if (!result) return next(new AppError("Invaid Enrollment Id", 400));

  // Dynamically update fields using reduce
  const updatedData = Object.entries(body).reduce((acc, [key, value]) => {
    if (result[key] !== undefined) {
      acc[key] = value; // Only update fields that exist on the result object
    }
    return acc;
  }, {});

  // Assign updated fields to the result
  Object.assign(result, updatedData);
  // result.firstName = firstName;
  // result.dob = dob;
  // result.status = stat;
  // result.certificateNo = certificateNo;
  // result.isSignature = isSignature;
  // result.middleName = middleName;
  // result.lastName = lastName;
  // result.fullName = fullName;
  // result.state = state;
  // result.country = country;
  // result.printStatus = printStatus;
  // result.photo = photo;

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
