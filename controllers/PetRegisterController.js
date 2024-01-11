const express = require("express");
const { PetSchema } = require("../models/petmodel");
const { ParentRegister } = require("../models/parentmodel");
const { PostTable } = require("../models/postModel");
const { Sequelize, Op, literal, col } = require("sequelize");
const sequelize = require("sequelize");
const asyncHandler = require("express-async-handler");
const { boolean } = require("joi");





const PetRegisterImageUpload = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
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
      ReadyToMet
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    const imageUrls =
      req.compressedImageUrls ||
      req.files.map((file) => {
        return `http://localhost:3000/uploads/${file.filename}`;
      });

    const add = await PetSchema.create({
      name,
      age,
      gender,
      parentId,
      about,
      Breed,
      size,
      Tries,
      species,
      image_urls: imageUrls,
      InterestHobbies,
      ReadyToMet
    });

    if (!add || !add.image_urls) {
      return res.status(500).json({ message: "Invalid response from the database" });
    }

    // Assuming ParentRegister is the Sequelize model for "ParentRegister" table
    const parentRegisterInfo = await ParentRegister.findOne({
      where: { id: parentId }, 
    });

    if (!parentRegisterInfo) {
      return res.status(404).json({ message: "ParentRegister record not found" });
    }

    if (add.ReadyToMet === true) {
      const createData = await PostTable.create({
        pet_id: add.petId,
        PetName: add.name,
        PetAge: add.age,
        PetGender: add.gender,
        ParentId: add.parentId,
        about: add.about,
        Breed: add.Breed,
        size: add.size,
        Tries: add.Tries,
        species: add.species,
        InterestHobbies: add.InterestHobbies,
        ReadyToMet: add.ReadyToMet,
        PetImage: add.image_urls,
        UserName: parentRegisterInfo.username,
        UserPicture: parentRegisterInfo.image_urls,
        UserLocation: parentRegisterInfo.city,
      });
      res.status(200).json({
        message: "PetRegister success",
        PetId: add.petId,
        imageUrls:add.image_urls
      });
    } else {
      res.status(200).json({
        message: "Pet Register success",
        PetId: add.petId,
        imageUrls: add.image_urls,
      });
    }
  } catch (error) {
    console.error("This is the Error", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};


const UpdateReadyToMeet = async (req, res) => {
  try {
    const { petId } = req.body;

    if (petId) {
      const [rowCount, [updatedPet]] = await PetSchema.update(
        { ReadyToMet: true },
        {
          where: {
            petId: petId,
          },
          returning: true,
          attributes: ["parentId"],
        }
      );
      if (rowCount > 0) {
        const parentRegisterInfo = await ParentRegister.findOne({
          where: {
            id: {
              [Op.eq]: updatedPet.parentId,
            },
          },
        });
        const userExists = await PostTable.findOne({
          where:{pet_id:petId}
        })

        if (!userExists) {
          if (parentRegisterInfo) {
            const create = await PostTable.create({
              pet_id: updatedPet.petId,
              PetName: updatedPet.name,
              PetAge: updatedPet.age,
              PetGender: updatedPet.gender,
              ParentId: updatedPet.parentId,
              about: updatedPet.about,
              Breed: updatedPet.Breed,
              size: updatedPet.size,
              Tries: updatedPet.Tries,
              species: updatedPet.species,
              InterestHobbies: updatedPet.InterestHobbies,
              ReadyToMet: updatedPet.ReadyToMet,
              PetImage: updatedPet.image_urls,
              UserName: parentRegisterInfo.username,
              UserPicture: parentRegisterInfo.image_urls,
              UserLocation: parentRegisterInfo.city,
            });
            res.status(200).json({
              message: "Your Pet is now Ready for Dating",
              Data: create,
            });
          } 
        } else {
          res.status(200).json({ message: "Your Pet is now Ready for Dating" });
        }
      } 
    } else {
      res.status(400).json({ message: "Request data is missing" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


const petDetail = async (req, res) => {
  try {
    const { petId } = req.body;
    const PetData = await PetSchema.findAll({
      where: { petId: petId },
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


const filterPet = async (req, res) => {
  const { UserId, species, gender} = req.body;

  const checkId = await ParentRegister.findOne({
    attributes: ["latitude", "longitude"],
    where: {
      id: UserId,
    },
  });

  if (checkId) {
    const { latitude, longitude } = checkId.dataValues;

    const recordsPerPage = 10;
    const distance = 10;

    const haversine = `(
      6371 * acos(
          cos(radians(${latitude}))
          * cos(radians(latitude))
          * cos(radians(longitude) - radians(${longitude}))
          + sin(radians(${latitude})) * sin(radians(latitude))
      )
    )`;
    const oppositeGender = gender === "male" ? "female" : "male";

    try {
      const result = await ParentRegister.findAndCountAll({
        attributes: ["id", [sequelize.literal(haversine), "distance"]],
        include: [
          {
            model: PostTable,
            where: {
              ReadyToMet: sequelize.literal(
                'CAST("PostTables"."ReadyToMet" AS BOOLEAN) = true'
              ),
              species: species,
              PetGender: oppositeGender,
            },
          },
        ],
        where: sequelize.literal(`${haversine} <= ${distance}`),
        order: [[sequelize.literal("distance"), "DESC"]],
        // limit: recordsPerPage,
        // offset: (page - 1) * recordsPerPage,
      });

      // const { count, rows } = result;
      // const totalPages = Math.ceil(count / recordsPerPage);
  
      const filteredData = result.rows.filter((row) => row.id !== UserId);
      return res.json({
        Data: filteredData,
        // TotalPage: totalPages,
        // CurrentPage: page,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(404).json({ message: "Invalid UserId, No data" });
  }
};


const imageGet = async (req,res)=>{
  const petId = req.params.petId;
  const imageData = await PetSchema.findOne({
    where: {
      petId: petId,
    },
  });
  if (imageData){
    res.status(200).json({
      message: "Getting Image successfully",
      Image: imageData.image_urls,
    });
  }else{
    res.status(400).json({message:"Data Not found"})
  }
} 


module.exports = {
  UpdateReadyToMeet,
  petDetail,
  filterPet,
  PetRegisterImageUpload,
  imageGet,
};


