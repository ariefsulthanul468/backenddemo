require("dotenv").config();
const http = require("http");
const axios = require("axios");
const generateOtp = require("./generateOtp");




const sendOtp = async (mobileno, otp) => {
  otp = otp.toString();
  let countryCodeRegex = /^(\+\d{1,2})?\D?(.*)$/;
  let result = mobileno.replace(countryCodeRegex, "$2");
  let number = result;
  const token = process.env.TOEKN;
  const credit = process.env.CREDIT;
  const sender = process.env.SENDER;
  const message = `Your%20VELAI%20OTP%20is%20${otp}.%20Please%20use%20this%20code%20to%20complete%20your%20verification%20process.%20Thank%20you%20for%20choosing%20our%20service.%20\n\nBest%20Regards%20\nTEAM%20VELAI%20\nANALYTICAL`;
  const template_id = process.env.TEMPLATE_ID;
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

