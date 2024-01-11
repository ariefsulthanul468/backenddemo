const { Sequelize, Datatypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { LikeTable } = require("../models/likeModel"); // Move the import here
const { PostTable } = require("../models/postModel");
const { Op, fn, col } = require("sequelize");


exports.likedPost = async (req, res) => {
  try {
    console.log(req.body)
    const { PetId, ParentId, LikedUserId,LikedUserPetId, PetName, PetImage, PetSpecies } =
      req.body;
    const insert = await LikeTable.create({
      PetId,
      ParentId,
      LikedUserId,
      PetName,
      PetImage,
      PetSpecies,
      LikedUserPetId,
    });
    res.status(200).json({
      message: "Like Data Created",
      insertData: insert,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.likedUser = async (req, res) => {
  try {
    const { LikedUserPetId } = req.body;

    const likedUserRecords = await LikeTable.findAll({
      attributes: ["PetId", "PetName", "PetSpecies", "PetImage"],
      where: {
        LikedUserPetId: {
          [Op.eq]: LikedUserPetId,
        },
      },
    });
    res.status(200).json({
      message: "Liked PetIds",
      LikedPet: likedUserRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.likedPostDetail = async (req, res) => {
  try {
    const petId = req.body.petId;

    const PostData = await PostTable.findAll({
      where: { pet_id: petId },
    });
    if (PostData.length > 0) {
      res.status(200).json({
        message: "Pet Details",
        Data: PostData,
      });
    } else {
      res.status(400).json({ message: "No Data Found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
};









