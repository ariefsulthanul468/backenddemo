/*  This page is for just demo purpose...
*Twilio code :
*const twilio = require("twilio");
*const { number } = require("joi");
* Your Twilio Account SID and Auth Token
// otp = otp.toString();
// const sendOtp = async (phonenumber, otp) => {
//   const accountSid = process.env.TWILIO_ACCOUNT_SID;
//   const authToken = process.env.TWILIO_ACCOUNT_AUTH_TOKEN;
//   // Create Twilio client
//   const client = twilio(accountSid, authToken);
//   // Your Twilio phone number (must be purchased on Twilio)
//   const twilioPhoneNumber = process.env.TWILIO_FROM_NUMBER;
//   try {
//     const message = await client.messages.create({
//       body: `<#> Your pet Otp is ${otp}`,
//       from: twilioPhoneNumber,
//       to: phonenumber
//     });
//     console.log(message.body)
//     console.log('Message sent successfully:', message.sid);
//   } catch (error) {
//     console.error('Error sending message:', error.message);
//   }
// }
// module.exports = sendOtp;
*
*Router
// router.post("/twilio", sendOtp)
*

auth Older version code 
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

exports.isAuthenticated = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "User not authorized" });
  }
  const decoded = jwt.verify(token, "random string");
  req.user = await User.findById(decoded.id);
 
  next();
};

*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*

















*/ 