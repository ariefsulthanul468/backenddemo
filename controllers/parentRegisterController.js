const ParentRegister = require("../models/parentmodel");
const asyncHandler = require("express-async-handler");

exports.insertParentDetails = asyncHandler(async (req, res) => {
    const {username, mailID, gender } =  req.body;
    console.log(username, mailID, gender);
    const parent = await ParentRegister.create({username, mailID, gender }); //Insert the user
    if (!parent) return res.status(400).json({ message: "Cannot Insert parent Details" });
       return res.status(200).json({username,mailID,gender,})
})