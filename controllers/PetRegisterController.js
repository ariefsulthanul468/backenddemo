const express = require("express");
const { PetSchema } = require("../models/petmodel");
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
      // image_urls,
      size,
      Tries,
      species,
      InterestHobbies,
      ReadyToMet,
      demo2,
    } = req.body;
    console.log(
      name,
      age,
      gender,
      parentId,
      about,
      Breed,
      // image_urls,
      size,
      Tries,
      species,
      InterestHobbies,
      ReadyToMet
    );

    if (!req.files || req.files.length === 0) {
      return res.status(500).json({ message: "Invalid Cloudinary response" });
    }
    const imageUrls = req.files.map((file) => file.path);
    const add = await PetSchema.create({
      name,
      age,
      gender,
      parentId,
      image_urls:imageUrls,
      about,
      Breed,
      size,
      Tries,
      species,
      InterestHobbies,
      ReadyToMet,
      demo2,
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
      { ReadyToMet: true},
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

const petDetail = async (req, res) => {
  try {
    const { petId } = req.body;
    const PetData = await PetSchema.findAll({
      where: { petId: petId },
      attributes: [
        "name",
        "age",
        "gender",
        "parentId",
        "image_urls",
        "about",
        "Breed",
        "size",
        "Tries",
        "species",
        "InterestHobbies",
        "ReadyToMet",
      ],
    });
    if (PetData.length > 0) {
      res.status(200).json({
        message: "Pet Details",
        Data: PetData,
      });
    } else {
      res.status(400).json({ message: "No Data Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const filterPet = async (req,res)=>{
  try {
    const {species,gender} = req.body;
    const filter = await PetSchema.findAll({
      where: {
        species: species,
        gender: gender,
        ReadyToMet:true
      },
    });
    if(filter.length>0){
      res.status(200).json({
        message: "Success Return pet detail",
        Data: filter,
      });
    }else{
      res.status(400).json({message:"No Data Found"})
    }
  } catch (error) {
    res.status(500).json({message:error})
  }
}

// exports.getValue = async (req, res) => {
//   const {UserId, species, gender } = req.body;

//   const checkId = await ParentRegister.findAll({
//     attributes: ["latitude", "longitude"],
//     where: {
//       id: UserId,
//     },
//   });

//   if (checkId) {
//     const { latitude, longitude } = checkId.dataValues;

//     const recordsPerPage = 10;
//     const distance = 10;

//     const haversine = `(
//       6371 * acos(
//           cos(radians(${latitude}))
//           * cos(radians(latitude))
//           * cos(radians(longitude) - radians(${longitude}))
//           + sin(radians(${latitude})) * sin(radians(latitude))
//       )
//     )`;

//     try {
//       const result = await ParentRegister.findAndCountAll({
//         attributes: ["id", [sequelize.literal(haversine), "distance"]],
//         include: [
//           {
//             model: PostTable,
//             attributes: [
//               "pet_id",
//               "PetName",
//               "PetAge",
//               "PetGender",
//               "ParentId",
//               "about",
//               "Breed",
//               "size",
//               "Tries",
//               "species",
//               "InterestHobbies",
//               "ReadyToMet",
//               "PetImage",
//               "UserName",
//               "UserPicture",
//               "UserLocation",
//             ],
//             where: {
//               ReadyToMet: sequelize.literal(
//                 'CAST("PostTables"."ReadyToMet" AS BOOLEAN) = true'
//               ),
//             },
//           },
//         ],
//         where: sequelize.literal(`${haversine} <= ${distance}`),
//         order: [[sequelize.literal("distance"), "DESC"]],
//         limit: recordsPerPage,
//         offset: (page - 1) * recordsPerPage,
//       });

//       const { count, rows } = result;
//       const totalPages = Math.ceil(count / recordsPerPage);

//       return res.json({
//         Data: rows,
//         TotalPage: totalPages,
//         CurrentPage: page,
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     return res.status(404).json({ message: "Invalid UserId, No data" });
//   }
// };

module.exports = {
  PetRegisterImageUpload,
  cloudinaryPetUpload,
  UpdateReadyToMeet,
  petDetail,
  filterPet,
};
