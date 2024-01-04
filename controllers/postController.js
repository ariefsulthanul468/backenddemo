const  {PostTable}  = require("../models/postModel");
const {PetSchema}  = require("../models/petmodel");
const {ParentRegister} = require("../models/parentmodel");



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
        ReadyToMet: true,
      },
      include: [
        {
          model: ParentRegister,
          attributes: ["username", "image_urls", "city"],
          // as: "ParentRegister", // Alias for the association
        },
      ],
    });

    console.log(checkDb.toString()); // Print the SQL query
    console.log("checKDb DATA", checkDb); // Print the SQL query
    console.log(checkDb.length);

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
          UserLocation: storedData.ParentRegister.city,
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
    } else if (checkDb.length == 0) {
      res.status(500).json({
        message: "No records found or Pet is not ready to meet.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


exports.checkUserRegisterPet = async (req, res) => {
  const { UserId } = req.body;
  console.log(UserId);

  try {
    const checkData = await PetSchema.findAll({
      where: { parentId: UserId, ReadyToMet: true }, 
        attributes: [
            "petId",
            "image_urls",
            "name"
      ],
    });
    if (checkData.length > 0) {
      res.status(200).json({
        message: "Your Request is Successfully Sent",
        Data: checkData,
      });
    } else {
      res.status(400).json({
        message: "Data Not Found. Go to Register the Pet",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};









