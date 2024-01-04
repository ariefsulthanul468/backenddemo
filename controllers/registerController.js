const register = require("../models/registermodel");
const asyncHandler = require("express-async-handler");
const generateOtp = require("../utils/generateOtp");
const sendOtp = require("../utils/sendOtp");
const loginUser = require("./user.controller")
const { encrypt, decrypt } = require("../utils/crypto");

// /*
// api  generateOtp
// @access public
// method POST
//  */
exports.generateOtp = asyncHandler(async (req, res) => {
  const { phonenumber } = req.body;
  const otp = generateOtp();
  console.log(otp)
  const otpSent = sendOtp(phonenumber, otp.toString());
  console.log(sendOtp(phonenumber, otp));
  console.log("the otpSent is ", otpSent)
  if (otpSent) {
    const userExist = await register.findOne({
      where: { phonenumber: phonenumber },
      returning: true,
    });
    if (userExist) {
      const updateOTP = await register.update(
        { otp: otp},
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
        return res.status(500).json({ message: "user otp not updated" });
      }
    } else {
      const registerUser = await register.create({
        phonenumber,
        otp,
        userRegister:false,
      });
      if (registerUser) {
        return res.status(200).json({ message: "user Created" });
      } else {
        return res.status(400).json({ message: "user not created" });
      }
    }
  } else {
    return res.status(500).json({ message: "OTP not sent by twilio" });
  }
});

// /*
// api  verifyOTP
// @access public
// method POST

//  */
exports.verifyOtp = asyncHandler(async (req, res) => {
  try {
    const { phonenumber, otp } = req.body;
    console.log('phonenumber:', phonenumber);
    console.log('otp:', otp);
    
    // Input validation if needed
    const userExist = await register.findOne({
      where: { phonenumber: phonenumber },
      returning: true,
    });
    console.log('Stored OTP:', userExist.otp);
    console.log('Entered OTP:', otp);

    if (userExist) {
      const isMatched = await userExist.comparePassword(otp.toString());
      console.log(isMatched)
      if (!isMatched) {
        return res.status(401).json({ error: "Invalid Otp" });
      }
      const token = await userExist.jwtToken();
      console.log("id",token)
      const refresh = await userExist.refreshToken();
      console.log("encrypt cause the issue!",refresh)
      // Encrypt the refresh token
      const encryptedToken =  encrypt(refresh);

      const options = {
        httpOnly: true,
      };
      return res.status(200).cookie("token", token, options).json({
        message: "Valid Otp",
        token,
        UserId: userExist._id,
        UserRegister:userExist.userRegister,
        encryptedToken,
      });
    } else {
      return res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


// /*
// api  ResendOTP
// @access public
// method POST

//  */

exports.ResendOtp = asyncHandler(async (req, res) => {
  const { phonenumber } = req.body;
  const otp = generateOtp();
  const otpSent = sendOtp(phonenumber, otp);
  console.log(otpSent);
  console.log("im the ", otpSent);
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











