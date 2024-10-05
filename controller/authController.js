const user = require("../db/models/user");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { isTokenBlacklisted, addToBlacklist } = require("./inMemory");
const { sendEmailUsingOAuth2 } = require("./otpController");


const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_PASSKEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// SIGNUP SECTION 
const signup = catchAsync(async (req, res, next) => {
  const body = req.body;

  if (!["admin", "ceo", "ed", "office", "cert"].includes(body.role)) {
    throw new AppError("Invalid User", 400);
  }

  const newUser = await user.create({
    role: body.role,
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
  const { email, password ,deviceId } = req.body;

  if (!email || !password) {
    return next(new AppError("Wrong email and password", 400));
  }

  const result = await user.findOne({ where: { email } });

  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Wrong email and password ", 400));
  }

  const token = generateToken({
    id: result.id,

    // ABOUT TO RU SOME TEST ON THIS 
    role:result.role
  });

  let recognizedDevices = result.recognizedDevices;

  if (typeof recognizedDevices === 'string') {
    try {
      recognizedDevices = JSON.parse(recognizedDevices); // Ensure it's an array
    } catch (err) {
      return next(new AppError("Error parsing recognized devices", 500));
    }
  }

  if (!Array.isArray(recognizedDevices)) {
    recognizedDevices = []; // If it's not an array, initialize as an empty array
  }


  if (["ceo", "ed", "admin"].includes(result.role)) {
    if (!recognizedDevices.includes(deviceId)) {
      // Generate OTP
      const updatedDevices = [...recognizedDevices, deviceId]; // Add new deviceId
      const otp = crypto.randomInt(100000, 999999).toString();
      result.otp = otp; // Store OTP
      result.otpExpires = new Date(Date.now() + 2 * 60 * 1000); // Set expiry to 2 minutes from now
        // result.recognizedDevices = updatedDevices;
      await result.save();

        // Send OTP via email
        // await sendEmailUsingOAuth2(result.email, otp);


      return res.status(200).json({
        status: "otp_required",
        message: "OTP has been sent to your email",
        token,
      });
    }
  }

  return res.json({
    status: "success",
    token,
  });
});

// LOGOUT 
const logout = catchAsync(async (req, res) => {
  let idToken = "";
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    idToken = req.headers.authorization.split(" ")[1];
  }

  if (!idToken) {
    return res.status(400).json({ message: "Token not provided" });
  }

  addToBlacklist(idToken);

  res.status(200).json({ message: "Logged out successfully" });
});


// AUTHENTICATION 
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
  
  if (isTokenBlacklisted(idToken)) {
    return res.status(401).json({ message: "Token is blacklisted" });
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

  const userWithAuth = {
    ...user.toJSON(), // Convert Sequelize model instance to a plain object
    isAuthenticated: true,     // Add isAuth as a property of the user object
  };

  // Return the modified user object
  res.status(200).json(userWithAuth);
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
  logout,
  authentication,
  getCurrentUser,
  changePassword,
  restrictTo
};
