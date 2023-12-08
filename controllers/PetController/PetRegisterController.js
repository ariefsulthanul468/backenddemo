const express = require("express");
const {PetSchema }= require("../../models/PetModel/petmodel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


// Set Cloudinary configuration only once when your application starts
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Change this to your desired folder name
    // allowed_formats: ["png", "jpg", "jpeg"],
    public_id: (req, file) =>
      `${file.originalname.split(".")[0]}-${Date.now()}`,
  },
});
const cloudinaryUpload = multer({ storage: storage });

const imageUpload = async (req, res) => {
  try {
    const { name, age, color, parentId } = req.body;
    console.log(name, age, color, parentId);

    // Check if the expected properties are present in the Cloudinary response
    if (!req.file || !req.file.path) {
      return res.status(500).json({ message: "Invalid Cloudinary response" });
    }

    // Extract the public_id from the Cloudinary URL
    const publicId = req.file.path.split("/").pop().split("-").shift();

    console.log("Image Path", req.file.path);

    const add = await PetSchema.create({
      name,
      age,
      color,
      parentId,
      image_url: req.file.path,
    });

    console.log("Add Table data", add);

    res.status(200).json({
      message: "Upload success",
      publicId: publicId,
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.error("This is the Error", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};


module.exports = { imageUpload, cloudinaryUpload };
