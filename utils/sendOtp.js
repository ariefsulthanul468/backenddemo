const twilio = require("twilio");

const accountSid = "ACcd331165056d79114ad83faad93ddcf7";
const authToken = "b234e6e0fd774119286813945e1f4184";

const client = twilio(accountSid, authToken);

const sendOtp = async (mobileno, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: +16626554568,
      to: mobileno,
    });

    console.log(`OTP sent: ${message.sid}`);
    return true;
  } catch (error) {
    console.error("Error sending otp:", error);
    return false;
  }
};
module.exports = sendOtp;
