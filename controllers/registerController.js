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
  const otpSent = await sendOtp(phonenumber, otp);
  if (otpSent) {
    const userExist = await register.findOne({
      where: { phonenumber: phonenumber },
      returning: true,
    });
    if (userExist) {
      const updateOTP = await register.update(
        { otp: otp },
        {
          where: {
            phonenumber: phonenumber,
          },
          individualHooks: true,
        }
      );
      if (updateOTP) {
        return res.status(200).json({ message: "user otp created" });
      } else {
        return res.status(500).json({ message: "user not created" });
      }
    } else {
      const registerUser = await register.create({
        phonenumber,
        otp,
      });
      if (registerUser) {
        return res.status(200).json({ message: "user Created" });
      } else {
        return res.status(400).json({ message: "user not created" });
      }
    }
  } else {
    return res.status(500).json({ message: "OTP not sent by tiwilio" });
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
  if (userExist) {
    const isMatched = await userExist.comparePassword(otp.toString());
    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect password or email" });
    }
    return res.status(200).json({ message: "otp verified" });
  }
});

/*
api  ResendOTP
@access public
method POST
 
 */

exports.ResendOtp = asyncHandler(async (req, res) => {
  const { phonenumber } = req.body;
  const otp = generateOTP();
  const otpSent = await sendOtp(phonenumber, otp);

  if (otpSent) {
    const userExist = await register.findOne({
      where: { phonenumber: phonenumber },
      returning: true,
    });
    if (userExist) {
      const updateOTP = await register.update(
        { otp: otp },
        {
          where: {
            phonenumber: phonenumber,
          },
          individualHooks: true,
        }
      );
      if (updateOTP) {
        return res.status(200).json({ message: "user otp updated" });
      } else {
        return res.status(500).json({ message: "user otp not updated " });
      }
    }
  } else {
    return res.status(500).json({ message: "OTP not sent by tiwilio" });
  }
});
