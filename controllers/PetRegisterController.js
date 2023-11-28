const PetSchema = require("../models/petmodel");
const asyncHandler = require("express-async-handler");

exports.insertPetDetails = asyncHandler(async (req, res) => {
    const { name, age, color } = req.body;
    console.log(name, age, color);
    const pet = await PetSchema.create({ name, age, color }); //Insert the user
    if (!pet) return res.status(400).json({ message: "Cannot Insert pet Details" });
    return res.status(200).json({ name, age, color })
})