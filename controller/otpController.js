const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const user = require("../db/models/user");

const subject = "Your OTP Code for Secure Access";

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

async function sendEmailUsingOAuth2(toEmail, otp) {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "diegbee0@gmail.com",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: "MapleLeaf",
    to: "evans@joemarineng.com",
    // to: toEmail,
    subject,
    text: `
    Hello ${toEmail},

We’re here to make sure your account stays secure. Use the following OTP to complete your recent request:

Your OTP Code: ${otp}

This code will expire in 1 minutes. For your protection, keep it private.

If you need further assistance, feel free to reach out to our support team at devans3001@gmail.com.

Warm regards,
The Joe Marine Team
    `,
    html: `
    <p>Hello ${toEmail},</p>

<p>We’re here to make sure your account stays secure. Use the following OTP to complete your recent request:</p>

<h2>Your OTP Code: <strong>${otp}</strong></h2>

<p>This code will expire in 5 minutes. For your protection, please keep it private.</p>

<p>If you need further assistance, feel free to reach out to our support team at  <a href="mailto:devans3001@gmail.com">devans3001@gmail.com</a> </p>

<p>Warm regards,<br>
The Joe Marine Team</p>

    `,
  };

  await transporter.sendMail(mailOptions);
}

const verifyOTP = catchAsync(async (req, res) => {
  try {
    const { otp, deviceId } = req.body;

    // Ensure the user is authenticated
    const tokenDetails = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_PASSKEY
    );

    const currentUser = await user.findByPk(tokenDetails.id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (new Date() > currentUser.otpExpires) {
      return res.status(401).json({
        status: "otp_expired",
        message: "OTP has expired. Please request a new one.",
      });
    }
    // Verify OTP
    if (currentUser.otp !== otp) {
      return res.status(401).json({ status: "error", message: "Invalid OTP" });
    }

    if (!Array.isArray(currentUser.recognizedDevices)) {
      currentUser.recognizedDevices = [];
    }

    // Add device to recognized devices if not already recognized
    if (!currentUser.recognizedDevices.includes(deviceId)) {
      const updatedDevices = [...currentUser.recognizedDevices, deviceId]; // Add new deviceId
      currentUser.recognizedDevices = updatedDevices;
    }

    // Clear OTP and expiration after successful verification
    currentUser.otp = null;
    currentUser.otpExpires = null;
    await currentUser.save();

    // Optionally issue a new JWT (or use the existing one)
    const newToken = jwt.sign({ id: currentUser.id }, process.env.JWT_PASSKEY, {
      expiresIn: "1h", // Set an expiration time for security
    });

    return res.status(200).json({
      status: "success",
      message: "OTP verified, login successful",
      token: newToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: `Something went wrong${error.message}`,
    });
  }
});

// const verifyOTP = catchAsync(async (req, res) => {
//   const { otp, deviceId } = req.body;

//   // Ensure the user is authenticated
//   const tokenDetails = jwt.verify(
//     req.headers.authorization.split(" ")[1],
//     process.env.JWT_PASSKEY
//   );
//   const currentUser = await user.findByPk(tokenDetails.id);

//   if (!currentUser) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   if (new Date() > currentUser.otpExpires) {
//     return res.status(401).json({
//       status: "otp_expired",
//       message: "OTP has expired. Please request a new one.",
//     });
//   }

//   // Verify OTP
//   if (currentUser.otp !== otp) {
//     return res.status(401).json({
//       status: "failed",
//       message: "Invalid OTP"
//     });
//   }

//   if (!Array.isArray(currentUser.recognizedDevices)) {
//     console.error("recognizedDevices is not an array.");
//     currentUser.recognizedDevices = [];
//   }

//   // If OTP is valid, add device to recognized devices
//   if (!currentUser.recognizedDevices.includes(deviceId)) {
//     // currentUser.recognizedDevices.push(deviceId);
//     const updatedDevices = [...currentUser.recognizedDevices, deviceId]; // Add new deviceId
//     currentUser.recognizedDevices = updatedDevices;

//     currentUser.otp = null; // Clear OTP after verification
//     currentUser.otpExpires = null;
//     currentUser.save();
//   }

//   return res.status(200).json({
//     status: "success",
//     message: "OTP verified, login successful",
//   });
// });

const requestNewOTP = catchAsync(async (req, res) => {
  const { deviceId } = req.body;

  // Verify the token from the authorization header
  const tokenDetails = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_PASSKEY
  );

  const currentUser = await user.findByPk(tokenDetails.id);

  if (!currentUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if deviceId exists in recognizedDevices array
  if (!Array.isArray(currentUser.recognizedDevices)) {
    currentUser.recognizedDevices = [];
  }

  // If the device is already recognized, no need for new OTP
  if (currentUser.recognizedDevices.includes(deviceId)) {
    currentUser.otp = null;
    await currentUser.save();
    return res.status(400).json({
      status: "already_recognized",
      message: "Device is already recognized. No OTP required.",
    });
  }

  // Generate a new OTP and update expiry
  const newOtp = crypto.randomInt(100000, 999999).toString();
  currentUser.otp = newOtp;
  currentUser.otpExpires = new Date(Date.now() + 60000); // 1 minutes expiry
  // currentUser.otpExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry
  await currentUser.save();

  // Send the OTP via email (or SMS, etc.
  // await sendEmailUsingOAuth2(currentUser.email, newOtp);

  return res.status(200).json({
    status: "otp_generated",
    message: "New OTP has been sent to your email.",
  });
});

module.exports = { sendEmailUsingOAuth2, verifyOTP, requestNewOTP };
