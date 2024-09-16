const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_PASSKEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// SIGNUP SECTION 
const signup = catchAsync(async (req, res, next) => {
  const body = req.body;

  if (!["admin", "ceo", "madam", "officer", "cert"].includes(body.role)) {
    throw new AppError("Invalid User", 400);
  }

  const newUser = await user.create({
    role: body.role,
    firstName: body.firstName,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  if (!newUser) {
    return next(new AppError("failed to create user ", 400));
  }

  const result = newUser.toJSON();

  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  return res.status(201).json({
    status: "successful",
    data: result,
  });
});

// LOGIN SECTION
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Wrong email and password", 400));
  }

  const result = await user.findOne({ where: { email } });

  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Wrong email and password ", 400));
  }

  const token = generateToken({
    id: result.id,
  });

  return res.json({
    status: "success",
    token,
  });
});

const authentication = catchAsync(async (req, res, next) => {
  let idToken = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    idToken = req.headers.authorization.split(" ")[1];
  }

  if (!idToken) {
    throw new AppError("please login to get access", 401);
  }

  const tokenDetals = jwt.verify(idToken, process.env.JWT_PASSKEY);
  console.log(tokenDetals);

  const freshUser = await user.findByPk(tokenDetals.id);

  if (!freshUser) {
    return next(new AppError("User no longer exist", 400));
  }

  req.user = freshUser;
  return next();
});

const getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await req.user; 
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  res.status(200).json(user);
});


// CHANGE PASSWORD 
const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id; 
  const activeUser = await user.findByPk(userId);
  if (!activeUser) {
    return next(new AppError("User not found", 404));
  }

  const isMatch = await bcrypt.compare(currentPassword, activeUser.password);
  if (!isMatch) {
    return next(new AppError("Current password is incorrect", 400));
  }

  if (newPassword.length < 8) {
    return next(new AppError("New password must be at least 6 characters long", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new AppError("New password and confirmation do not match", 400));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  activeUser.password = hashedPassword;
  await activeUser.save();

  res.status(200).json({ message: "Password changed successfully" });
});

const restrictTo = (...role) =>{
  const checkPermission = (req,res,next)=>{
    if(!role.includes(req.user.role)){
      return next(new AppError("You dont have permission to perform this action",403))
    }

    return next()
  }
  return checkPermission
}



module.exports = {
  signup,
  login,
  authentication,
  getCurrentUser,
  changePassword,
  restrictTo
};
