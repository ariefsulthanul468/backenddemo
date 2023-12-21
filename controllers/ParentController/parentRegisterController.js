const ParentRegister = require("../../models/ParentModel/parentmodel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


// Set Cloudinary configuration only once when your application starts
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "parentImage",
        // public_id: (req, file) =>
        //     `${file.originalname.split(".")[0]}-${Date.now()}`,
    }
});

const cloudinaryParentUpload = multer({ storage: storage });

const insertParentDetails = async (req, res) => {
  try {
    console.log("checking");
    const { username, mailID, gender, latitude, longitude, city, state } =
      req.body;

    if (!req.file || !req.file.path) {
      return res.status(500).json({ message: "Invalid Cloudinary response" });
    }
    // Check if email already exists
    const existingParent = await ParentRegister.findOne({
      where: { mailID: mailID },
    });

    if (existingParent) {

      return res.status(409).json({ message: "Email already exists" });
    }

    const newParent = await ParentRegister.create({
      username,
      mailID,
      gender,
      image_urls: req.file.path,
      latitude,
      longitude,
      city,
      state,
    });
    const userId = newParent.id; 
    res.status(200).json({
      message: "Upload success",
      UserId: userId,
      image_urls: req.file.path,
    });
  } catch (error) {
    console.error("This is the Error", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};



module.exports = { insertParentDetails, cloudinaryParentUpload };

