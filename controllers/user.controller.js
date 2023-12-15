// const User = require("../models/usermodel");
const { sequelize } =require("../config/database")
const { Op, col, literal } = require('sequelize');
const {
  validateUserSignup,
  validateUserLogin,
} = require("../validators/user.validator");
const { encrypt, decrypt } = require("../utils/crypto");
const ParentRegister = require("../models/ParentModel/parentmodel");
const ParentRegister2 = require("../models/ParentModel/parentModel2");

// exports.createUser = async (req, res) => {
//   try {
//     // const { err } = validateUserSignup(req.body); // Validate the information from the request body
//     // if (err) return res.status(400).json({ message: err.message });
//     // console.log(req.body.email);
//     const userExist = await User.findOne({ where: { email: req.body.email } }); // Checking if the user exist
//     if (userExist) return res.status(400).json({ message: "User exist" });
//     const { name, email, password, role, latitude, longitude } = req.body;
//     console.log(name, email, password, role, latitude, longitude)
//     const user = await User.create({ name, email, password, role,latitude,longitude }); //Creating the user
//     if (!user) return res.status(400).json({ message: "Cannot create user" });

//     const options = {
//       expiresIn: 3000,
//       httpOnly: true,
//     };

//     return res.status(200).json({
//       message: "Signup successfull",
//     });
//   } catch (error) {
//     console.log(error.message);
//     console.log("Unable to create a User");
//   }
// };

// exports.loginUser = async (req, res) => {
//   try {
//     const { err } = validateUserLogin(req.body);
//     if (err) return res.status(400).json({ message: err.message }); // Validate the users input

//     // find the email of the user
//     const user = await User.findOne({
//       where: { email: req.body.email },
//     });

//     const isMatched = await user.comparePassword(req.body.password);
//     if (!isMatched)
//       return res.status(400).json({ message: "Incorrect password or email" });

//     const token = await user.jwtToken();
//     const refresh = await user.refreshToken();

//     //encrypt the refresh
//     const encryptedToken = encrypt(refresh);
//     const options = {
//       httpOnly: true,
//     };

//     return res.status(200).cookie("token", token, options).json({
//       message: "Login successfull",
//       token,
//       encryptedToken,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };


// exports.sample = async(req, res) => {
//   for(let i=0;i<4;i++){
//     const ins = await ParentRegister.create({
//       name: "nagaraj" + i,
//       mailId: "nagaraj" + i + "@gmail.com",
//       latitude: 13.003387,
//       longitude: 80.255043,
//       image_url:"",
//       city: "chennai",
//       state: "Tamilnadu",
//     });
//   }
//   res.json({ message: "susccess" });

// };



exports.getValue = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;
    let distance = 20;
    const distanceRounded = Math.floor(distance);
    distance = distanceRounded;
    const limit = 10;
    await ParentRegister.update(
        {
          latitude: latitude,
          longitude: longitude,
        },
        {
          where: {
            UserId: userId,
          },
        }
      );
    const haversine = `(
        6371 * acos(
            cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude) - radians(${longitude}))
            + sin(radians(${latitude})) * sin(radians(latitude))
        )
    )`;
    // Get userIds from ParentRegister2
    const userIdsFromParentRegister2 = await ParentRegister2.findAll({
      attributes: ["UserId"],
      raw: true,
    });
    // console.log("userIdsFromParentRegister2", userIdsFromParentRegister2);

    const userIdsArray = userIdsFromParentRegister2.map((user) => user.UserId);

    // console.log("userIdsArray", userIdsArray);
    const whereClause = {
      [Op.and]: [
        sequelize.literal(haversine + " <= " + distance),
        {
          UserId: {
            [Op.notIn]: userIdsArray,
          },
        },
      ],
    };

    // Check if req.body.UserId exists and is not undefine
    const nearbyUsers = await ParentRegister.findAll({
      attributes: [
        "id",
        "UserId",
        "username",
        "mailID",
        "gender",
        "image_urls",
        "latitude",
        "longitude",
        "city",
        "state",
        [sequelize.literal(haversine), "distance"],
      ],
      where: whereClause,
      order: sequelize.literal("distance"),
      limit: limit,
    });
    let length = nearbyUsers.length;
    console.log("length", length);

    const formattedData = nearbyUsers.map((stored) => ({
      id: stored.id,
      UserId: stored.UserId,
      username: stored.username,
      mailID: stored.mailID,
      gender: stored.gender,
      latitude: stored.latitude,
      longitude: stored.longitude,
      image_urls: stored.image_urls,
      city: stored.city,
      state: stored.state,
    }));

    if (length > 0) {
      for (let i = 0; i < length; i++) {
        let stored = nearbyUsers[i];
        console.log(i, stored);
        await ParentRegister2.create({
          id: stored.id,
          UserId: stored.UserId,
          username: stored.username,
          mailID: stored.mailID,
          gender: stored.gender,
          latitude: stored.latitude,
          longitude: stored.longitude,
          image_urls: stored.image_urls,
          city: stored.city,
          state: stored.state,
        });
      }
      return res.status(200).json({nearbyUsers});
    } else {
      res.status(404).json({ message: "No data Found"});
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.filterByCity = async(req,res)=>{
  try {
    const {city} = req.body;
    console.log(city)
    const filter = await ParentRegister.findAll({
      where: {
        city: city,
      },
      order: [["UserId","DESC"]],
    });
    return res.json({ filter });
  } catch (error) {
    res.status(500).json({message:error})
  }
}







