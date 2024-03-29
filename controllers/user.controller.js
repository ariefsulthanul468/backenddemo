const {
  validateUserSignup,
  validateUserLogin,
} = require("../validators/user.validator");
const { encrypt, decrypt } = require("../utils/crypto");
const { ParentRegister } = require("../models/parentmodel");
// const ParentRegister2 = require("../models/parentModel2");
const { PostTable } = require("../models/postModel");
const { Sequelize, Op, literal, col } = require("sequelize");
const sequelize = require("sequelize");


exports.getValue = async (req, res) => {
  const { UserId, species, gender } = req.body;

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
    console.log(oppositeGender)
    
    try {
      const result = await ParentRegister.findAndCountAll({
        attributes: ["id", [sequelize.literal(haversine), "distance"]],
        include: [
          {
            model: PostTable,
            attributes: [
              "pet_id",
              "PetName",
              "PetAge",
              "PetGender",
              "ParentId",
              "about",
              "Breed",
              "size",
              "Tries",
              "species",
              "InterestHobbies",
              "ReadyToMet",
              "PetImage",
              "UserName",
              "UserPicture",
              "UserLocation",
            ],
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

      // Exclude the current user's data from the result
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

exports.updateLocation = async (req, res) => {
  try {
    const { UserId, latitude, longitude,city } = req.body;
    const checkId = await ParentRegister.findAll({
      where: {
        id: UserId,
      },
    });
    const length = checkId.length;
    if (length > 0) {
      await ParentRegister.update(
        {
          latitude: latitude,
          longitude: longitude,
          city: city,
        },
        {
          where: {
            id: UserId,
          },
        }
      );
    } else {
      return res.status(404).json({ message: "Invalid UserId No data" });
    }
    console.log(UserId, latitude, longitude, city);
    res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.userUpdate = async (req, res) => {
  const { UserId, city, latitude, longitude } = req.body;
  console.log(UserId, city, latitude, longitude);

  const check = await ParentRegister.findAll({ where: { id: UserId } });
  if (check) {
    await ParentRegister.update(
      {
        city: city,
        latitude: latitude,
        longitude: longitude,
      },
      {
        where: {
          id: UserId,
        },
      }
    );
    res.status(200).json({ message: "location Updated Success" });
  } else {
    res.status(400).json({ message: "Data Not Found" });
  }
};

exports.filterByCity = async (req, res) => {
  try {
    const { city } = req.body;
    console.log("This is city", city);
    const filter = await PostTable.findAll({
      where: {
        UserLocation: city,
        ReadyToMet: "true",
      },
    });
    console.log(filter.length);
    if (filter.length > 0) {
      return res.json({ filter });
    } else {
      res.status(400).json({ message: "No data found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};


