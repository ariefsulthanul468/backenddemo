require("dotenv").config();
const twilio = require("twilio");
const http = require("http");
const axios = require("axios");
const generateOtp = require("./generateOtp");
// const { number } = require("joi");

// Your Twilio Account SID and Auth Token
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


const sendOtp  = async (mobileno, otp) => {
  let countryCodeRegex = /^(\+\d{1,2})?\D?(.*)$/;
  let result = mobileno.replace(countryCodeRegex, "$2");
  number = result;
  token = "cde2fa96abb6992e38856dbb7c55300a";
  credit = "4";
  sender = "ANALGO";
  otp = otp.toString();
  message = `Your%20VELAI%20OTP%20is%20${otp}.%20Please%20use%20this%20code%20to%20complete%20your%20verification%20process.%20Thank%20you%20for%20choosing%20our%20service.%20\n\nBest%20Regards%20\nTEAM%20VELAI%20\nANALYTICAL`;
  template_id = "1607100000000254432";
  console.log("The number is " ,number)
  const url = `http://site.ping4sms.com/api/smsapi?key=${token}&route=${credit}&sender=${sender}&number=${number}(s)&sms=${message}&templateid=${template_id}`;
  try {
    const response = await axios.get(url);
    console.log("The response is successful", response.data);
    return true;
  } catch (error) {
    console.log("Your request was failed ", error);
    return false;
  }
};

module.exports = sendOtp































// const accountSid = "ACcd331165056d79114ad83faad93ddcf7";
// const authToken = "b234e6e0fd774119286813945e1f4184";

// const client = twilio(accountSid, authToken);

