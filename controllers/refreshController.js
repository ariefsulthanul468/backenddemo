const { encrypt, decrypt } = require("../utils/crypto");
const jwt = require("jsonwebtoken");

const register = require("../models/registermodel");


exports.refreshController = async (req, res) => {
  try {
    const { id, refreshToken } = req.body;
    const userExist = await register.findOne({
      where: { _id: req.body.id },
    });
    if (!userExist) return res.status(400).json({ message: "register not exist" });
    const decryptToken = decrypt(refreshToken);

    const decoded = jwt.verify(decryptToken, "SECERET@refreshToken");
    const user = await register.findOne({ where: { _id: decoded.id } });
    console.log(user._id);
    console.log(id);
    if (user._id == id) {
      const token = await user.jwtToken();
      const refresh = await user.refreshToken();
      const encryptedToken = encrypt(refresh);

      return res.status(200).json({
        message: "Signup successfull",
        token,
        encryptedToken,
      });
    } else {
      return res.status(500).json({
        message: "Refresh Token is not valid",
      });
    }
  } catch (error) {
    console.log(error.message);
    console.log("Unable to create a register");
  }
};
