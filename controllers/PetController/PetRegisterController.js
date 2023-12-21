const express = require("express");
const PetSchema = require("../../models/PetModel/petmodel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { boolean } = require("joi");


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", 
    public_id: (req, file) =>
      `${file.originalname.split(".")[0]}-${Date.now()}`,
  },
});
const cloudinaryPetUpload = multer({ storage: storage });

const PetRegisterImageUpload = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      parentId,
      about,
      Breed,
      size,
      Tries,
      species,
      InterestHobbies,
      ReadyToMet,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(500).json({ message: "Invalid Cloudinary response" });
    }
    const imageUrls = req.files.map((file) => file.path);
    const add = await PetSchema.create({
      name,
      age,
      gender,
      parentId,
      image_urls: imageUrls,
      about,
      Breed,
      size,
      Tries,
      species,
      InterestHobbies,
      ReadyToMet:"No"
    });

    if (!add || !add.image_urls) {
      return res
        .status(500)
        .json({ message: "Invalid response from the database" });
    }
    const PetId = add.petId;

    res.status(200).json({
      message: "Upload success",
      PetId:PetId,
      imageUrls: add.image_urls,
    });
  } catch (error) {
    console.error("This is the Error", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};


const UpdateReadyToMeet = async (req,res)=>{
  try{
  const { petId,ReadyToMet } = req.body;

  if (ReadyToMet) {
    await PetSchema.update(
      { ReadyToMet: "yes" },
      {
        where: {
          petId: petId,
        },
      }
    );
    res.status(200).json({ message: "user Updated success" });
  }else{
    res.status(400).json({message:"Request data is missing"})
  }
}catch(error){
  res.status(500).json({message:error})
}
}




module.exports = {
  PetRegisterImageUpload,
  cloudinaryPetUpload,
  UpdateReadyToMeet,
};
