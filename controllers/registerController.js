const register = require("../models/registermodel");
const asyncHandler = require("express-async-handler");
const generateOTP = require("../utils/generateOtp");
const sendOtp = require("../utils/sendOtp");

/*
api  generateOtp
@access public
method POST
 
 */
exports.generateOtp = asyncHandler(async (req, res) => {
  const { phonenumber } = req.body;
  const otp = generateOTP();
  const otpSent = sendOtp(phonenumber, otp);

  if (otpSent) {
    const userExist = await register.findOne({
      where: { phonenumber: phonenumber },
      returning: true,
    });
    if (userExist) {
      const updateOTP = await register.u;
    } else {
      const registerUser = await register.create({
        phonenumber,
        otp,
      });
      if (registerUser) {
        res.status(200).json({ message: "user Created" });
      } else {
        res.status(400).json({ message: "user not created" });
      }
    }
  } else {
    res.status(500).json({ message: "OTP not sent by tiwilio" });
  }
});

/*
api  verifyOTP
@access public
method POST
 
 */
exports.verifyOtp = asyncHandler(async (req, res) => {
  const { phonenumber, otp } = req.body;
  const userExist = await register.findOne({
    where: { phonenumber: phonenumber },
    returning: true,
  });

  res.status(200).json({ message: "sucesss" });
});
