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


// exports.checkUserRegisterPet = async (req, res) => {
//   const { UserId } = req.body;
//   console.log(UserId);

//   try {
//     const checkData = await PetSchema.findAll({
//       where: { parentId: UserId, ReadyToMet: "yes" },
//       include: [
//         {
//           model: PostTable,
//           where: { ParentId: UserId },
//           attributes: [
//             "pet_id",
//             "PetName",
//             "PetAge",
//             "PetGender",
//             "ParentId",
//             "about",
//             "Breed",
//             "size",
//             "Tries",
//             "species",
//             "InterestHobbies",
//             "ReadyToMet",
//             "PetImage",
//             "UserName",
//             "UserPicture",
//             "UserLocation",
//           ],
//         },
//       ],
//     });

//     if (checkData.length > 0) {
//       res.status(200).json({
//         message: "Your Request is Successfully Sent",
//         Data: checkData,
//       });
//     } else {
//       res.status(400).json({
//         message: "Data Not Found. Go to Register the Pet",
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

*/ 

// this is post data to post table 


// exports.postControl = async (req, res) => {
//   try {
//     const { petId } = req.body;
//     console.log(petId);

//     const checkDb = await PetSchema.findAll({
//       attributes: [
//         "petId",
//         "name",
//         "age",
//         "gender",
//         "parentId",
//         "about",
//         "Breed",
//         "image_urls",
//         "size",
//         "Tries",
//         "species",
//         "InterestHobbies",
//         "ReadyToMet",
//       ],
//       where: {
//         petId: petId,
//         ReadyToMet: "yes",
//         "$ParentRegister.id$": { [Sequelize.Op.col]: "PetSchema.parentId" },
//         // "$ParentRegister.id$": Sequelize.col("PetSchema.parentId"),
//       },
//       include: [
//         {
//           model: ParentRegister,
//           attributes: ["username", "image_urls", "city"],
//         },
//       ],
//     });
//     console.log(checkDb.toString()); // Print the SQL query
//     console.log("checKDb DATA",checkDb); // Print the SQL query
//     console.log(checkDb.length)
//     if (checkDb.length > 0) {
//       const storedData = checkDb[0];

//       try {
//         const create = await PostTable.create({
//           pet_id: storedData.petId,
//           PetName: storedData.name,
//           PetAge: storedData.age,
//           PetGender: storedData.gender,
//           ParentId: storedData.parentId,
//           about: storedData.about,
//           Breed: storedData.Breed,
//           size: storedData.size,
//           Tries: storedData.Tries,
//           species: storedData.species,
//           InterestHobbies: storedData.InterestHobbies,
//           ReadyToMet: storedData.ReadyToMet,
//           PetImage: storedData.image_urls,
//           UserName: storedData.ParentRegister.username,
//           UserPicture: storedData.ParentRegister.image_urls,
//           UserLocation: storedData.ParentRegister.city,
//         });
//         console.log("Created:", create);
//         res.status(200).json({
//           message: "Post Data inserted Successfully",
//           PostData: create,
//         });
//       } catch (error) {
//         console.error("Error creating record:", error);
//         res.status(500).json({ message: "Internal server error." });
//       }
//     } else {
//       res
//         .status(500)
//         .json({ message: "No records found or Pet is not ready to meet." });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

