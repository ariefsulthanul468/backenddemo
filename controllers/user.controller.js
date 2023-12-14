const User = require("../models/usermodel");
const { sequelize } = require("../config/database");
const { Op, col, literal } = require('sequelize');
const {
  validateUserSignup,
  validateUserLogin,
} = require("../validators/user.validator");
const { encrypt, decrypt } = require("../utils/crypto");
const { where } = require("sequelize");
const User2 = require("../models/usermodel2")

exports.createUser = async (req, res) => {
  try {
    // const { err } = validateUserSignup(req.body); // Validate the information from the request body
    // if (err) return res.status(400).json({ message: err.message });
    // console.log(req.body.email);
    const userExist = await User.findOne({ where: { email: req.body.email } }); // Checking if the user exist
    if (userExist) return res.status(400).json({ message: "User exist" });
    const { name, email, password, role, latitude, longitude } = req.body;
    console.log(name, email, password, role, latitude, longitude)
    const user = await User.create({ name, email, password, role,latitude,longitude }); //Creating the user
    if (!user) return res.status(400).json({ message: "Cannot create user" });

    const options = {
      expiresIn: 3000,
      httpOnly: true,
    };

    return res.status(200).json({
      message: "Signup successfull",
    });
  } catch (error) {
    console.log(error.message);
    console.log("Unable to create a User");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { err } = validateUserLogin(req.body);
    if (err) return res.status(400).json({ message: err.message }); // Validate the users input

    // find the email of the user
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    const isMatched = await user.comparePassword(req.body.password);
    if (!isMatched)
      return res.status(400).json({ message: "Incorrect password or email" });

    const token = await user.jwtToken();
    const refresh = await user.refreshToken();

    //encrypt the refresh
    const encryptedToken = encrypt(refresh);
    const options = {
      httpOnly: true,
    };

    return res.status(200).cookie("token", token, options).json({
      message: "Login successfull",
      token,
      encryptedToken,
    });
  } catch (error) {
    console.log(error.message);
  }
};


// exports.sample = async(req, res) => {
//   for(let i=0;i<6;i++){
//     const ins = await User.create({
//       name:"sankar" + i,
//       email:"sankar" + i + "@gmail.com",
//       latitude: 13.0368,
//       longitude: 80.2676,
//       password:"Sankar@10"+i,
//       role: "user",
//       status : true
//     });
//     console.log(ins)
//   }
// };


exports.getValue = async (req, res) => {
  try {
    // const page = req.body.page;
    const pageSize = 10;
    const result = await User.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: pageSize,
      // offset: (page - 1) * pageSize,
    });
    let data = result.rows;
    // const totalItems = result.count;
    // const totalPages = Math.ceil(totalItems / pageSize);
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      let stored= data[i]
     const add =await User2.create({
      _id:stored._id,
      name: stored.name,
      email: stored.email,
      password: stored.password,
      role:stored.role,
     });
     console.log("Deleted Data :",[i]);
     const removeData =await User.destroy({
      where:{
        _id:stored._id
      }
     })
    }
    // res.json({ data, page, pageSize, totalItems, totalPages });
    res.json({ data});
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.nearByUsersExample = async (req, res) => {
  const latitude = 13.003387;
  const longitude = 80.255043;
  let distance = 10; // Distance is initially set to a decimal value
  const distanceRounded = Math.floor(distance);
  

  // Convert distance to a whole number
  distance = distanceRounded;
  console.log(distance);
  const limit = 5;



  // Haversine formula
  const haversine = `(
      6371 * acos(
          cos(radians(${latitude}))
          * cos(radians(latitude))
          * cos(radians(longitude) - radians(${longitude}))
          + sin(radians(${latitude})) * sin(radians(latitude))
      )
  )`;

  try {
      const users = await User.findAll({
          attributes: [
              '_id',
              'name',
              'email',
              [sequelize.literal(haversine), 'distance'],
          ],
          where: {
              [Op.and]: [
                  sequelize.literal(haversine + ' <= ' + distance),
                  { status: true },
              ],
          },
          order: col('distance'),
          limit: limit,
      });
      console.log(await User.findOne({attributes:[ [sequelize.literal(haversine), 'distance']]}))
      return res.json(users);
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};