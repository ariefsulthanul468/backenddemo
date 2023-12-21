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



exports.sample = async(req, res) => {
  for(let i=0;i<4;i++){
    const ins = await ParentRegister.create({
      name: "nagaraj" + i,
      mailId: "nagaraj" + i + "@gmail.com",
      latitude: 13.003387,
      longitude: 80.255043,
      image_url:"",
      city: "chennai",
      state: "Tamilnadu",
    });
  }
  res.json({ message: "susccess" });

};



// exports.getValue = async (req, res) => {
//   try {
//     const { userId, latitude, longitude } = req.body;
//     let distance = 20;
//     const distanceRounded = Math.floor(distance);
//     distance = distanceRounded;
//     const limit = 10;
//     await ParentRegister.update(
//         {
//           latitude: latitude,
//           longitude: longitude,
//         },
//         {
//           where: {
//             UserId: userId,
//           },
//         }
//       );
//     const haversine = `(
//         6371 * acos(
//             cos(radians(${latitude}))
//             * cos(radians(latitude))
//             * cos(radians(longitude) - radians(${longitude}))
//             + sin(radians(${latitude})) * sin(radians(latitude))
//         )
//     )`;
//     // Get userIds from ParentRegister2
//     const userIdsFromParentRegister2 = await ParentRegister2.findAll({
//       attributes: ["UserId"],
//       raw: true,
//     });
//     // console.log("userIdsFromParentRegister2", userIdsFromParentRegister2);

//     const userIdsArray = userIdsFromParentRegister2.map((user) => user.UserId);

//     // console.log("userIdsArray", userIdsArray);
//     const whereClause = {
//       [Op.and]: [
//         sequelize.literal(haversine + " <= " + distance),
//         {
//           UserId: {
//             [Op.notIn]: userIdsArray,
//           },
//         },
//       ],
//     };

//     // Check if req.body.UserId exists and is not undefine
//     const nearbyUsers = await ParentRegister.findAll({
//       attributes: [
//         "id",
//         "UserId",
//         "username",
//         "mailID",
//         "gender",
//         "image_urls",
//         "latitude",
//         "longitude",
//         "city",
//         "state",
//         [sequelize.literal(haversine), "distance"],
//       ],
//       where: whereClause,
//       order: sequelize.literal("distance"),
//       limit: limit,
//     });
//     let length = nearbyUsers.length;
//     console.log("length", length);

//     const formattedData = nearbyUsers.map((stored) => ({
//       id: stored.id,
//       UserId: stored.UserId,
//       username: stored.username,
//       mailID: stored.mailID,
//       gender: stored.gender,
//       latitude: stored.latitude,
//       longitude: stored.longitude,
//       image_urls: stored.image_urls,
//       city: stored.city,
//       state: stored.state,
//     }));

//     if (length > 0) {
//       for (let i = 0; i < length; i++) {
//         let stored = nearbyUsers[i];
//         console.log(i, stored);
//         await ParentRegister2.create({
//           id: stored.id,
//           UserId: stored.UserId,
//           username: stored.username,
//           mailID: stored.mailID,
//           gender: stored.gender,
//           latitude: stored.latitude,
//           longitude: stored.longitude,
//           image_urls: stored.image_urls,
//           city: stored.city,
//           state: stored.state,
//         });
//       }
//       return res.status(200).json({nearbyUsers});
//     } else {
//       res.status(404).json({ message: "No data Found"});
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

 // Adjust the path accordingly















*/ 