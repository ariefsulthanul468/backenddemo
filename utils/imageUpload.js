
// const multer = require("multer");

// const path = require("path");
// const fs = require("fs");


// let uploadedImages = [];

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Store files in the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     const fileName =
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname);
//     uploadedImages.push(fileName); // Store the filename in the array
//     cb(null, fileName); // Set file name
//   },
// });

// const upload = multer({ storage: storage, limits: { files: 5 } });


// module.exports = { upload };

// const multer = require("multer");
// const path = require("path");

// let uploadedImages = [];

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Store files in the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     const fileName =
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname);
//     uploadedImages.push(fileName); // Store the filename in the array
//     cb(null, fileName); // Set file name
//   },
// });



// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // Limit file size to5 mega bytes
//     files: 5, // Limit the number of files to 5
//   },
//   // fileFilter,
// });

const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs")

const storage = multer.memoryStorage();
let uploadedImages = [];

const compressAndSave = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      const compressedImages = await Promise.all(
        req.files.map(async (file) => {
          const compressedBuffer = await sharp(file.buffer)
            .resize({ width: 800, height: 600, fit: "inside" }) // Adjust dimensions as needed
            .jpeg({ quality: 80 }) // Adjust quality value (0-100) as needed
            .toBuffer();

          const compressedFileName = file.fieldname + "-" + Date.now() + ".jpg";

          uploadedImages.push(compressedFileName);

          fs.writeFileSync(
            path.join("uploads", compressedFileName),
            compressedBuffer
          );
          return `http://192.168.1.25:3000/uploads/${compressedFileName}`;
        })
      );
      req.compressedImageUrls = compressedImages;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5 megabytes
    files: 5, // Limit the number of files to 5
  },
});


module.exports = { upload, compressAndSave };
