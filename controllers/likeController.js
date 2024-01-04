const { Sequelize, Datatypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { LikeTable } = require("../models/likeModel"); // Move the import here
const { PostTable } = require("../models/postModel");
const { Op, fn, col } = require("sequelize");

exports.likedPost = async (req, res) => {
  try {
    const { PetId, ParentId, LikedUserId } = req.body;
    const insert = await LikeTable.create({
      PetId,
      ParentId,
      LikedUserId,
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
    const { LikedUserId, PetId } = req.body;
    console.log(LikedUserId, PetId);
    
    const filter = await LikeTable.findOne({
      where: {
        LikedUserId: {
          [Op.eq]: LikedUserId,
        },
        PetId: {
          [Op.eq]: PetId,
        },
      },
      include: [
        {
          model: PostTable,
          where: {
            pet_id: {
              [Op.eq]: fn('uuid', col('PostTable.pet_id')),
            },
          },
        },
      ],
    });

    if (filter) {
      res.status(200).json({
        message: "Filtered Data",
        Data: filter,
      });
    } else {
      res.status(400).json({ message: "No Data FilterID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};







