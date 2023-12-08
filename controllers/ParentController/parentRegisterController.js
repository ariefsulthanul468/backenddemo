const ParentRegister = require("../../models/ParentModel/parentmodel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");




// Set Cloudinary configuration only once when your application starts
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "parentImage",
        public_id: (req, file) =>
            `${file.originalname.split(".")[0]}-${Date.now()}`,
    }
});

const cloudinaryParentUpload = multer({ storage: storage });

const insertParentDetails = async (req, res) => {
    try {
        console.log("checking")
        const {username, mailID, gender } = req.body;
        console.log(username, mailID, gender);
        //  console.log(req.file.path)


        // Check if the expected properties are present in the Cloudinary response
        if (!req.file || !req.file.path) {
            return res.status(500).json({ message: "Invalid Cloudinary response" });
        }

        // Extract the public_id from the Cloudinary URL
        const publicId = req.file.path.split("/").pop().split("-").shift();

        console.log("Image Path", req.file.path);

        const add = await ParentRegister.create({
           
            username,
            mailID,
            gender,
            image_urls: req.file.path,
        })
        console.log("Add Table data", add);
        res.status(200).json({
            message: "Upload success",
            publicId: publicId,
            image_urls: req.file.path,
        });
    } catch (error) {
        console.error("This is the Error", error);
        res.status(500).json({ message: "Upload failed", error: error.message });
    }

}


module.exports =  {insertParentDetails, cloudinaryParentUpload}

// exports.insertParentDetails = asyncHandler(async (req, res) => {
//     const { username, mailID, gender } = req.body;
//     console.log(username, mailID, gender);
//     const parent = await ParentRegister.create({ username, mailID, gender }); //Insert the user
//     if (!parent) return res.status(400).json({ message: "Cannot Insert parent Details" });
//     return res.status(200).json({ username, mailID, gender, })
// })