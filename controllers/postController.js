const PostTable = require("../models/PostModel/postModel");
const PetSchema = require("../models/PetModel/petmodel");
const ParentRegister = require("../models/ParentModel/parentmodel");
const {Sequelize} = require("sequelize")


exports.postControl = async (req, res) => {
  try {
    const { petId } = req.body;
    console.log(petId);

    const checkDb = await PetSchema.findAll({
      attributes: [
        "petId",
        "name",
        "age",
        "gender",
        "parentId",
        "about",
        "Breed",
        "image_urls",
        "size",
        "Tries",
        "species",
        "InterestHobbies",
        "ReadyToMet",
      ],
      where: {
        petId: petId,
        ReadyToMet: "yes",
        "$ParentRegister.id$": { [Sequelize.Op.col]: "PetSchema.parentId" },
      },
      include: [
        {
          model: ParentRegister,
          attributes: ["username", "image_urls","city"],
        },
      ],
    });

    if (checkDb.length > 0) {
      const storedData = checkDb[0];

      try {
        const create = await PostTable.create({
          pet_id: storedData.petId,
          PetName: storedData.name,
          PetAge: storedData.age,
          PetGender: storedData.gender,
          ParentId: storedData.parentId,
          about: storedData.about,
          Breed: storedData.Breed,
          size: storedData.size,
          Tries: storedData.Tries,
          species: storedData.species,
          InterestHobbies: storedData.InterestHobbies,
          ReadyToMet: storedData.ReadyToMet,
          PetImage: storedData.image_urls,
          UserName: storedData.ParentRegister.username,
          UserPicture: storedData.ParentRegister.image_urls,
          UserLocation:storedData.ParentRegister.city,
        });
        console.log("Created:", create);
        res.status(200).json({
          message: "Post Data inserted Successfully",
          PostData: create,
        });
      } catch (error) {
        console.error("Error creating record:", error);
        res.status(500).json({ message: "Internal server error." });
      }
    } else {
      res
        .status(500)
        .json({ message: "No records found or Pet is not ready to meet." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


exports.checkUserRegisterPet = async (req,res)=>{
  const { UserId } = req.body;
  console.log(UserId);
  const checkData = await PetSchema.findAll({
    where: { parentId: UserId, ReadyToMet: "yes" },
    include: [
      {
        model: PostTable,
        where: { ParentId: UserId },
      },
    ],
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
  });
  if(checkData){
    res
      .status(200)
      .json({ message: "Your Request is SuccessFully Send", Data: checkData });
  }else{
    res.status(400).json({ message: "Data Not Found Go to Register the Pet"});
  }
}






