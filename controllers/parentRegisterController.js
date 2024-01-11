const { ParentRegister } = require("../models/parentmodel");
const asyncHandler = require("express-async-handler");
const Register = require("../models/registermodel");




const insertParentDetails = async (req, res) => {
  try {
    console.log("checking");
    const { username, mailID, gender,id } =
      req.body;
      console.log(username, mailID, gender, id);
  
    const existingParent = await ParentRegister.findOne({
      where: { mailID: mailID },
    });

    if (existingParent) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const newParent = await ParentRegister.create({
      id,
      username,
      mailID,
      gender,
    });
    const registerUpdate = await Register.update(
      {userRegister:true},
      {
        where:{
          _id:id
      },
    })
    res.status(200).json({
      message: "Upload success",
    });
  } catch (error) {
    console.error("This is the Error", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

const UserEditProfile = async (req,res)=>{
  try {
    const { username, mailID, gender } = req.body;
  } catch (error) {
    res.status(500).json({message:error})
  }
}


module.exports = { insertParentDetails};

