const User = require("../models/usermodel");
const {
  validateUserSignup,
  validateUserLogin,
} = require("../validators/user.validator");
const { encrypt, decrypt } = require("../utils/crypto");
const { where } = require("sequelize");

exports.createUser = async (req, res) => {
  try {
    const { err } = validateUserSignup(req.body); // Validate the information from the request body
    if (err) return res.status(400).json({ message: err.message });
    console.log(req.body.email);
    const userExist = await User.findOne({ where: { email: req.body.email } }); // Checking if the user exist
    if (userExist) return res.status(400).json({ message: "User exist" });
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role }); //Creating the user
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
exports.sample = async (req, res) => {
  res.send("hii")
}